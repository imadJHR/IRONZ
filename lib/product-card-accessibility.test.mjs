import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parseDocument, DomUtils } = require("htmlparser2");
const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();
function noOperation() { throw new Error("Unexpected product operation"); }
function Link({ children, ...props }) { return React.createElement("a", props, children); }
function Icon(props) { return React.createElement("svg", { ...props, "aria-hidden": true }); }
function Image({ src, alt, className }) { return React.createElement("img", { src, alt, className }); }
const motion = new Proxy({}, { get: (_, tag) => {
  function Motion({ children, className }) { return React.createElement(tag, { className }, children); }
  return Motion;
} });
function load(file) {
  const absolute = path.resolve(root, file);
  if (modules.has(absolute)) return modules.get(absolute);
  const exports = {};
  modules.set(absolute, exports);
  let source = readFileSync(absolute, "utf8");
  if (file === "app/produit/page-client.tsx") source += "\nexports.CardForTest = ProductCard;";
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, {
    exports, process: { env: {} }, fetch: noOperation,
    require(name) {
      if (name === "react" || name === "react/jsx-runtime") return require(name);
      if (name === "next/link") return Link;
      if (name === "next/image") return Image;
      if (name === "next/navigation") return { useSearchParams: noOperation };
      if (name === "lucide-react") return new Proxy({}, { get: () => Icon });
      if (name === "framer-motion") return { motion, AnimatePresence: React.Fragment };
      if (name.endsWith("/cart-context")) return { useCart: noOperation };
      if (name.endsWith("/favorites-context")) return { useFavorites: () => ({
        isInFavorites: () => false, addToFavorites: noOperation, removeFromFavorites: noOperation,
      }) };
      if (name.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(absolute), `${name}.ts`)));
      throw new Error(`Unexpected dependency ${name}`);
    },
  });
  return exports;
}
function nodes(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.children || []).flatMap((child) => nodes(child, predicate))];
}
const Card = load("app/produit/page-client.tsx").CardForTest;
const base = { price: 149, inStock: true, stockQuantity: 3, image: "/placeholder.svg" };
const fixtures = [
  { ...base, _id: "record-1", slug: "haltere", name: "Haltère IRONBULL 12,5 kg" },
  { ...base, id: "legacy-id", name: 'Bande "Small" & résistance <script>texte</script>' },
  { ...base, _id: "record-3", slug: "boxe", name: "Gants de boxe – Enfants", inStock: false, stockQuantity: 0 },
];
function render(product, viewMode) {
  return parseDocument(renderToStaticMarkup(React.createElement(Card, {
    product, viewMode, index: 0, handleAddToCart: noOperation,
  })));
}

test("both catalog card variants name the arrow with the exact current product name", () => {
  for (const viewMode of ["grid", "list"]) for (const product of fixtures) {
    const dom = render(product, viewMode);
    const links = nodes(dom, (n) => n.name === "a");
    const arrow = links.find((n) => nodes(n, (child) => child.name === "svg").length);
    assert.ok(arrow);
    assert.equal(arrow.attribs["aria-label"], `Voir le produit ${product.name}`);
    assert.equal(arrow.attribs.href, `/produit/${product.slug || product._id || product.id}`);
    assert.equal(nodes(dom, (n) => n.name === "script").length, 0);
  }
});

test("the existing three product links, decorative icon and native keyboard semantics remain intact", () => {
  for (const viewMode of ["grid", "list"]) for (const product of fixtures) {
    const dom = render(product, viewMode);
    const links = nodes(dom, (n) => n.name === "a");
    assert.equal(links.length, 3);
    assert.ok(links.every((n) => n.attribs.href === `/produit/${product.slug || product._id || product.id}`));
    const image = links.find((n) => nodes(n, (child) => child.name === "img").length);
    assert.equal(nodes(image, (n) => n.name === "img")[0].attribs.alt, product.name);
    assert.ok(links.some((n) => DomUtils.textContent(n) === product.name));
    const arrow = links.find((n) => n.attribs["aria-label"]);
    assert.equal(arrow.attribs["aria-hidden"], undefined);
    assert.equal(arrow.attribs.tabindex, undefined);
    assert.equal(arrow.attribs.role, undefined);
    assert.equal(nodes(arrow, (n) => n.name === "svg").length, 1);
  }
});

test("renaming a product updates its accessible arrow name without changing its destination", () => {
  const original = fixtures[0];
  const renamed = { ...original, name: "Haltère renommé – 12,5 kg" };
  for (const viewMode of ["grid", "list"]) {
    const arrow = (p) => nodes(render(p, viewMode), (n) => n.name === "a" && !!n.attribs["aria-label"])[0];
    assert.equal(arrow(original).attribs.href, arrow(renamed).attribs.href);
    assert.equal(arrow(renamed).attribs["aria-label"], `Voir le produit ${renamed.name}`);
  }
});
