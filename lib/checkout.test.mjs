import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { CheckoutMailConfigurationError, getCheckoutMailConfig } from "./checkout-mail.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const { NextRequest, NextResponse } = require("next/server");
const source = readFileSync(new URL("../app/api/checkout/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText;

const mailEnv = {
  EMAIL_USER: "shop@example.com",
  EMAIL_PASS: "test-password",
  EMAIL_TO: "orders@example.com",
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
};
const order = {
  orderNumber: "CMD-123456", firstName: "Test", lastName: "Client",
  email: "", phone: "0600000000", address: "Adresse de test", city: "Agadir",
  postalCode: "", country: "Maroc", paymentMethod: "cashOnDelivery",
  shippingMethod: "standard", items: [{ name: "Disques", price: 1319, quantity: 1 }],
  subtotal: "1 319 MAD", total: "1 319 MAD",
};

function checkoutHandler({ env = mailEnv, failure } = {}) {
  const sent = [];
  const transports = [];
  const logs = [];
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    process: { env },
    console: { error: (...args) => logs.push(args) },
    require(name) {
      if (name === "next/server") return { NextResponse };
      if (name === "../../../lib/checkout-mail") return { getCheckoutMailConfig };
      if (name === "nodemailer") return {
        createTransport(options) {
          transports.push(options);
          return { async sendMail(message) {
            if (failure) throw failure;
            sent.push(message);
            return { accepted: [env.EMAIL_TO], rejected: [] };
          } };
        },
      };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { POST: exports.POST, sent, transports, logs };
}

function request(body) {
  return new NextRequest("http://localhost/api/checkout", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("checkout uses the configured SMTP host and STARTTLS port", () => {
  const { transport } = getCheckoutMailConfig(mailEnv);
  assert.equal(transport.host, "smtp.example.com");
  assert.equal(transport.port, 587);
  assert.equal(transport.secure, false);
  assert.equal(transport.auth.pass, mailEnv.EMAIL_PASS);
  assert.ok(transport.connectionTimeout <= 10000);
  assert.ok(transport.socketTimeout <= 15000);
});

test("legacy Gmail configuration defaults to TLS on port 465", () => {
  const { transport } = getCheckoutMailConfig({ ...mailEnv, SMTP_HOST: undefined, SMTP_PORT: undefined });
  assert.equal(transport.host, "smtp.gmail.com");
  assert.equal(transport.port, 465);
  assert.equal(transport.secure, true);
});

test("missing merchant recipient and invalid ports fail before SMTP", () => {
  assert.throws(() => getCheckoutMailConfig({ ...mailEnv, EMAIL_TO: " " }), CheckoutMailConfigurationError);
  for (const port of ["invalid", "0", "65536", "12.5"]) {
    assert.throws(() => getCheckoutMailConfig({ ...mailEnv, SMTP_PORT: port }), CheckoutMailConfigurationError);
  }
});

test("valid order without optional customer email is delivered to the merchant", async () => {
  const handler = checkoutHandler();
  const response = await handler.POST(request(order));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, orderNumber: order.orderNumber });
  assert.equal(handler.sent.length, 1);
  assert.equal(handler.sent[0].to, mailEnv.EMAIL_TO);
  assert.equal(handler.sent[0].cc, undefined);
  assert.equal(handler.sent[0].replyTo, undefined);
  assert.match(handler.sent[0].subject, /CMD-123456/);
  assert.equal(handler.transports[0].host, mailEnv.SMTP_HOST);
});

test("provided customer email receives a copy and can reply", async () => {
  const handler = checkoutHandler();
  const response = await handler.POST(request({ ...order, email: " client@example.com " }));
  assert.equal(response.status, 200);
  assert.equal(handler.sent[0].cc, "client@example.com");
  assert.equal(handler.sent[0].replyTo, "client@example.com");
});

test("SMTP auth rejection is reported without a false order confirmation or leaked credentials", async () => {
  const handler = checkoutHandler({ failure: Object.assign(new Error("secret SMTP response"), {
    code: "EAUTH", responseCode: 535, command: "AUTH PLAIN",
  }) });
  const response = await handler.POST(request(order));
  const result = await response.json();
  assert.equal(response.status, 503);
  assert.equal(result.success, false);
  assert.match(result.message, /panier est conservé/);
  assert.equal(result.orderNumber, undefined);
  assert.equal(handler.sent.length, 0);
  assert.equal(handler.logs[0][1].code, "EAUTH");
  assert.doesNotMatch(JSON.stringify(handler.logs), /secret SMTP response|test-password/);
});

test("missing server configuration cannot send an order", async () => {
  const handler = checkoutHandler({ env: { ...mailEnv, EMAIL_TO: undefined } });
  const response = await handler.POST(request(order));
  assert.equal(response.status, 503);
  assert.equal(handler.transports.length, 0);
  assert.equal(handler.sent.length, 0);
});

test("malformed JSON and invalid carts return 400 without sending email", async () => {
  const handler = checkoutHandler();
  for (const payload of ["{", null, {}, { ...order, items: [] }, { ...order, email: "invalid" },
    { ...order, items: [{ ...order.items[0], quantity: 0 }] },
    { ...order, items: [{ ...order.items[0], price: "1319" }] }]) {
    const response = await handler.POST(request(payload));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).success, false);
  }
  assert.equal(handler.transports.length, 0);
  assert.equal(handler.sent.length, 0);
});
