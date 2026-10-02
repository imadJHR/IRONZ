import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const compiled = ts.transpileModule(
  readFileSync(new URL("../app/checkout/page.tsx", import.meta.url), "utf8"),
  { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  } },
).outputText;

function text(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node !== "object") return String(node);
  if (Array.isArray(node)) return node.map(text).join(" ");
  return text(node.props?.children);
}

function find(node, predicate) {
  if (!node || typeof node !== "object") return undefined;
  if (Array.isArray(node)) return node.map((child) => find(child, predicate)).find(Boolean);
  if (predicate(node)) return node;
  return find(node.props?.children, predicate);
}

// Execute the component's real handlers with isolated hooks and network calls.
function checkout({ fetch, trackingFails = false }) {
  const slots = [];
  let cursor = 0;
  let cleared = 0;
  let requests = 0;
  const exports = {};
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = index === 0 ? true : initial;
      return [slots[index], (next) => { slots[index] = typeof next === "function" ? next(slots[index]) : next; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useEffect() {},
  };
  vm.runInNewContext(compiled, {
    exports, Error, TypeError,
    console: { warn() {} },
    window: { scrollTo() {} },
    fetch: async (...args) => { requests++; return fetch(...args); },
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return require(name);
      if (name === "next/link") return "Link";
      if (name === "next/navigation") return { useRouter: () => ({ push() {} }) };
      if (name === "lucide-react") return new Proxy({}, { get: (_, key) => String(key) });
      if (name.startsWith("../../components/ui/")) {
        return { Button: "Button", Input: "Input", Label: "Label", RadioGroup: "RadioGroup", RadioGroupItem: "RadioGroupItem" };
      }
      if (name === "../../context/cart-context") return { useCart: () => ({
        cart: [{ id: "product-1", name: "Disques", price: 1319, quantity: 1 }],
        cartTotal: 1319, clearCart: () => { cleared++; },
      }) };
      if (name === "../../lib/utils") return { cn: (...args) => args.filter(Boolean).join(" ") };
      if (name === "../../lib/image-url") return { optimizeImageUrl: (url) => url };
      if (name === "../../components/FacebookPixel") return { trackFBEvent() {
        if (trackingFails) throw new Error("Tracking unavailable");
      } };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  const render = () => { cursor = 0; return exports.default(); };
  let tree = render();
  for (const [name, value] of Object.entries({ firstName: "Test", lastName: "Client", phone: "0600000000", address: "Adresse test", city: "Agadir" })) {
    const input = find(tree, (node) => node.type === "Input" && node.props.name === name);
    assert.ok(input, `Missing ${name} input`);
    input.props.onChange({ target: { name, value, type: "text" } });
    tree = render();
  }
  const next = find(tree, (node) => node.type === "Button" && /suivante/i.test(text(node)));
  assert.ok(next, "Missing next-step button");
  next.props.onClick();
  tree = render();
  const submit = find(tree, (node) => node.type === "Button" && /confirmer/i.test(text(node)));
  assert.ok(submit, "Missing order submission button");
  return {
    submit: () => submit.props.onClick({ preventDefault() {} }), render,
    get cleared() { return cleared; }, get requests() { return requests; },
  };
}

test("SMTP failure keeps the cart and exposes an inline error with retry enabled", async () => {
  const page = checkout({ fetch: async () => Response.json({ success: false, message: "Votre panier est conservé." }, { status: 503 }) });
  await page.submit();
  const tree = page.render();
  assert.equal(page.cleared, 0);
  assert.match(text(find(tree, (node) => node.props?.role === "alert")), /panier est conservé/);
  assert.equal(find(tree, (node) => node.type === "Button" && /confirmer/i.test(text(node))).props.disabled, false);
});

test("rapid repeated submissions send only one request", async () => {
  let complete;
  const page = checkout({ fetch: () => new Promise((resolve) => { complete = resolve; }) });
  const first = page.submit();
  const second = page.submit();
  assert.equal(page.requests, 1);
  complete(Response.json({ success: true, orderNumber: "CMD-123456" }));
  await Promise.all([first, second]);
  assert.equal(page.cleared, 1);
});

test("a Facebook tracking exception cannot fail an accepted order", async () => {
  const page = checkout({ trackingFails: true, fetch: async () => Response.json({ success: true, orderNumber: "CMD-123456" }) });
  await page.submit();
  assert.equal(page.cleared, 1);
  assert.match(text(page.render()), /Commande Confirmée/);
  assert.match(text(page.render()), /CMD-123456/);
  assert.equal(find(page.render(), (node) => node.props?.role === "alert"), undefined);
});

test("a 200 response without a success acknowledgement cannot empty the cart", async () => {
  const page = checkout({ fetch: async () => Response.json({ success: false }) });
  await page.submit();
  assert.equal(page.cleared, 0);
  assert.ok(find(page.render(), (node) => node.props?.role === "alert"));
});

test("a network failure preserves the cart and allows a retry", async () => {
  const page = checkout({ fetch: async () => { throw new TypeError("Failed to fetch"); } });
  await page.submit();
  assert.equal(page.cleared, 0);
  assert.match(text(find(page.render(), (node) => node.props?.role === "alert")), /connexion/);
});
