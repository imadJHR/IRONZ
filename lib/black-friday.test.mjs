import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { BLACK_FRIDAY_PACKS, getBlackFridayPack } from "./black-friday.ts";
import { SITE_URL } from "./site.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
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
