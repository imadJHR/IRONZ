import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { BLACK_FRIDAY_PACKS, getBlackFridaySavings } from "./black-friday.ts";
import { SITE_ADDRESS } from "./site.ts";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");
const component = {};
vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../components/black-friday-content.tsx", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText, { exports: component, require(name) {
  if (name === "react/jsx-runtime") return require(name);
  if (name === "next/link") return { __esModule: true, default: ({ href, children, className }) => React.createElement("a", { href, className }, children) };
  if (name === "../lib/black-friday") return { BLACK_FRIDAY_PACKS, getBlackFridaySavings };
  if (name === "../lib/site") return { SITE_ADDRESS };
  throw new Error(`Unexpected dependency: ${name}`);
} });
const html = renderToStaticMarkup(React.createElement(component.default));
const text = html.replace(/<[^>]+>/g, "");

test("server-rendered comparison links to all six packs with their current prices", () => {
  const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].slice(1);
  assert.equal(rows.length, 6);
  for (const [index, pack] of BLACK_FRIDAY_PACKS.entries()) {
    assert(rows[index][1].includes(`href="/produit/${pack.slug}"`));
    assert(rows[index][1].includes(`${new Intl.NumberFormat("fr-MA").format(pack.price)} DH`));
  }
  assert(html.includes('href="/categories/supplement"'));
  assert(html.includes('href="/contact"'));
  assert.equal((html.match(/<h1\b/g) || []).length, 0, "The collection keeps its existing single H1");
});

test("FAQ and buying guide retain factual pack, price, delivery and consultation information", () => {
  assert.equal((html.match(/<details\b/g) || []).length, 6);
  assert(text.includes("875 DH"));
  assert(text.includes("1.754 DH"));
  assert(text.includes("10,79 %"));
  assert(text.includes("151 DH"));
  assert(text.includes("l’appareil n’est pas vendu dans le pack"));
  assert(text.includes("Sahara Mall, à Agadir"));
  assert(!/24\s*\/\s*48\s*h|meilleur prix|résultats garantis|guérit|brûle les graisses|stock limité|offre expire/i.test(text));
});
