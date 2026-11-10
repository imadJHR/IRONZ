import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { BLACK_FRIDAY_PACKS, getBlackFridayPack, getBlackFridaySavings } from "./black-friday.ts";
import { SITE_URL } from "./site.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const seo = {};
vm.runInNewContext(ts.transpileModule(readFileSync(new URL("./black-friday-seo.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, {
  exports: seo,
  require(name) {
    if (name === "./black-friday") return { BLACK_FRIDAY_PACKS };
    if (name === "./site") return { SITE_URL };
    throw new Error(`Unexpected dependency: ${name}`);
  },
});

test("all six packs preserve poster prices and distinct canonical identities", () => {
  assert.deepEqual(BLACK_FRIDAY_PACKS.map(({ price, oldPrice }) => [price, oldPrice]), [[1754, 1949], [1449, 1599], [875, 1030], [1249, 1400], [999, 1120], [1325, 1560]]);
  assert.equal(new Set(BLACK_FRIDAY_PACKS.map((pack) => pack.id)).size, 6);
  assert.equal(new Set(BLACK_FRIDAY_PACKS.map((pack) => pack.slug)).size, 6);
  assert.equal(getBlackFridayPack("unknown-product"), undefined);
  for (const pack of BLACK_FRIDAY_PACKS) assert.equal(getBlackFridayPack(pack.slug), pack);
});

test("every pack has its branded WebP photo, original poster and individual SEO copy", () => {
  for (const field of ["seoTitle", "seoDescription", "longDescription", "imageAlt"]) {
    assert.equal(new Set(BLACK_FRIDAY_PACKS.map((pack) => pack[field])).size, 6);
  }
  for (const pack of BLACK_FRIDAY_PACKS) {
    assert(existsSync(new URL(`../public${pack.image}`, import.meta.url)), pack.image);
    assert(existsSync(new URL(`../public${pack.poster}`, import.meta.url)), pack.poster);
    assert(pack.image.endsWith(".webp"));
    assert(pack.longDescription.length > 200);
    assert(!/guérit|garanti|renforce l.immunité|meilleurs résultats/i.test(pack.description));
  }
});

test("displayed discounts use actual prices instead of the inconsistent poster percentages", () => {
  assert.deepEqual(BLACK_FRIDAY_PACKS.map(getBlackFridaySavings), [
    { amount: 195, percentageLabel: "10,01" },
    { amount: 150, percentageLabel: "9,38" },
    { amount: 155, percentageLabel: "15,05" },
    { amount: 151, percentageLabel: "10,79" },
    { amount: 121, percentageLabel: "10,80" },
    { amount: 235, percentageLabel: "15,06" },
  ]);
});

test("rendered pack pages show the calculated discount without the contradictory original poster", () => {
  const component = {};
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../components/black-friday-product.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, {
    exports: component,
    require(name) {
      if (name === "react/jsx-runtime") return require(name);
      if (name === "./black-friday-image") return { __esModule: true, default: ({ src, alt }) => React.createElement("img", { src, alt }) };
      if (name === "next/link") return { __esModule: true, default: ({ href, children }) => React.createElement("a", { href }, children) };
      if (name === "./black-friday-icons") return { PackIcon: () => null };
      if (name === "./black-friday-cart-button") return { __esModule: true, default: () => React.createElement("button", null, "Ajouter au panier") };
      if (name === "../lib/black-friday") return { BLACK_FRIDAY_PACKS, getBlackFridaySavings };
      if (name === "../lib/black-friday-seo") return seo;
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  for (const pack of BLACK_FRIDAY_PACKS) {
    const html = renderToStaticMarkup(React.createElement(component.default, { pack }));
    const text = html.replace(/<[^>]+>/g, "");
    assert(text.includes(`−${getBlackFridaySavings(pack).percentageLabel} %`), pack.slug);
    assert(!html.includes(pack.poster), pack.slug);
    const productSchema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(productSchema.offers.price, pack.price.toFixed(2));
  }
});

test("Product markup matches the actual pack price and free Moroccan delivery", () => {
  for (const pack of BLACK_FRIDAY_PACKS) {
    const schema = seo.blackFridayProductSchema(pack);
    assert.equal(schema.name, pack.name);
    assert.equal(schema.description, pack.description);
    assert.equal(schema.offers.price, pack.price.toFixed(2));
    assert.equal(schema.offers.priceCurrency, "MAD");
    assert.equal(schema.offers.shippingDetails.shippingRate.value, 0);
    assert.equal(schema.offers.shippingDetails.shippingDestination.addressCountry, "MA");
    assert.equal(schema.image[0], `${SITE_URL}${pack.image}`);
    assert.equal(schema.url, `${SITE_URL}/produit/${pack.slug}`);
    assert(!("aggregateRating" in schema));
    assert(!("review" in schema));
    assert(!("priceValidUntil" in schema.offers));
    assert(!("brand" in schema));
    const breadcrumb = seo.blackFridayBreadcrumbs(pack).itemListElement;
    assert.equal(breadcrumb.at(-1).item, schema.url);
    assert.equal(breadcrumb[1].item, `${SITE_URL}/black-friday`);
  }
});

test("collection links to all six product pages in display order", () => {
  const collection = seo.blackFridayCollectionSchema();
  assert.equal(collection.mainEntity.numberOfItems, 6);
  assert.deepEqual(Array.from(collection.mainEntity.itemListElement, (item) => item.url), BLACK_FRIDAY_PACKS.map((pack) => `${SITE_URL}/produit/${pack.slug}`));
});
