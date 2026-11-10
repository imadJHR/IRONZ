import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => readFileSync(path.join(root, file), "utf8");
const expectedPhones = ["+212674114446", "+212669510042"];

function evaluate(source, globals = {}) {
  const sandboxModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, { module: sandboxModule, exports: sandboxModule.exports, ...globals });
  return JSON.parse(JSON.stringify(sandboxModule.exports));
}
const site = evaluate(read("lib/site.ts"));

// Evaluate only the published identity object, never the application, auth or APIs.
function identity(file, type) {
  const source = read(file);
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const objects = [];
  const literals = {};
  for (const statement of tree.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer && ts.isStringLiteral(declaration.initializer)) {
        literals[declaration.name.text] = declaration.initializer.text;
      }
    }
  }
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const property = node.properties.find((property) => property.name?.getText(tree) === '"@type"');
      if (property && ts.isStringLiteral(property.initializer) && property.initializer.text === type &&
          (type !== "Organization" || node.properties.some((property) => property.name?.getText(tree) === "contactPoint"))) objects.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  assert.equal(objects.length, 1, `${file}: expected one existing ${type} object`);
  return evaluate(`module.exports = (${objects[0].getText(tree)});`, { ...site, ...literals });
}

test("both published phones retain international tel links without implying WhatsApp availability", () => {
  assert.deepEqual(site.SITE_PHONES, expectedPhones);
  assert.equal(site.SITE_PHONE, expectedPhones[0]);
  for (const contact of site.SITE_CONTACTS) {
    assert.match(contact.telephone, /^\+212\d{9}$/);
    assert.equal(contact.href, `tel:${contact.telephone}`);
    assert.equal(contact.label.replaceAll(" ", ""), contact.telephone);
    assert.equal(contact.whatsapp, undefined);
  }
  assert.equal(site.SITE_EMAIL, "info@ironz.ma");
});

test("published store identity has both official phones, Agadir and no unconfirmed opening hours", () => {
  const store = identity("app/ClientLayout.tsx", "SportingGoodsStore");
  assert.deepEqual(store.telephone, expectedPhones);
  assert.equal(store.email, site.SITE_EMAIL);
  assert.equal(store.address.addressLocality, "Agadir");
  assert.equal(store.address.addressCountry, "MA");
  assert.match(store.address.streetAddress, /SAHARA MALL/);
  for (const field of ["openingHours", "openingHoursSpecification", "geo", "branchOf"]) assert.equal(store[field], undefined);
});

for (const file of ["app/HomeClient.tsx", "app/produit/page.tsx"]) {
  test(`${file}: existing Organization uses confirmed contacts and physical location`, () => {
    const organization = identity(file, "Organization");
    assert.deepEqual(organization.contactPoint.map((point) => point.telephone), expectedPhones);
    assert.equal(organization.email, "info@ironz.ma");
    assert.equal(organization.address.addressLocality, "Agadir");
    assert.equal(organization.address.streetAddress, "Sahara Mall");
    assert.equal(organization.address.postalCode, undefined);
    assert.equal(organization.geo, undefined);
  });
}

test("Casablanca remains a service area without a fictional local establishment", () => {
  const service = identity("app/services/amenagement-salle/casablanca/page.tsx", "Service");
  assert.deepEqual(service.areaServed, { "@type": "City", name: "Casablanca" });
  assert.equal(service.url, "https://www.ironz.ma/services/amenagement-salle/casablanca");
  assert.equal(service.address, undefined);
  assert.equal(service.geo, undefined);
  assert.equal(service.provider.address, undefined);
});

test("shared delivery and warranty claims do not invent universal timing, duration or free services", () => {
  const homepage = read("app/HomeClient.tsx");
  const layout = read("app/ClientLayout.tsx");
  assert.match(layout, /BLACK FRIDAY — 6 PACKS EXCLUSIFS · LIVRAISON GRATUITE/);
  assert.match(layout, /href="\/black-friday"/);
  assert.match(layout, /Garanties selon les produits et conditions applicables/);
  assert.doesNotMatch(homepage, /24\s*\/\s*48\s*h|2 ans inclus|Conseils Gratuits|7j\/7|solution immédiate/);
  assert.doesNotMatch(homepage, /meilleur prix|qualité garantie/);
  assert.doesNotMatch(layout, /openingHoursSpecification|opens:|closes:/);
  assert.doesNotMatch(layout, /L'élite|élite de l'équipement|professional-grade gear/);
});
