import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { productIdentifierSchema } from "./product-identifiers.ts";
import { productBrandSchema } from "./product-brand.ts";
import { productAggregateRatingSchema } from "./product-review-summary.ts";
import { productOfferSchema } from "./product-offer.ts";
import { productMetaDescription, productMetaTitle } from "./product-meta.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));
const compile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;

function pageFor(product) {
  const exports = {};
  vm.runInNewContext(compile(read("../app/produit/[slug]/page.tsx")), {
    exports, console: { error() {} },
    require(name) {
      if (name === "react") return { cache: (callback) => callback };
      if (name === "react/jsx-runtime") return require(name);
      if (name === "next/navigation") return { notFound() { throw Error("Not found"); } };
      if (name === "./ProductDetailClient") return { default() {} };
      if (name.endsWith("/product-identifiers")) return { productIdentifierSchema };
      if (name.endsWith("/product-offer")) return { productOfferSchema };
      if (name.endsWith("/product-brand")) return { productBrandSchema };
      if (name.endsWith("/product-review-summary")) return { productAggregateRatingSchema };
      if (name.endsWith("/product-meta")) return { productMetaDescription, productMetaTitle };
      if (name.endsWith("/og-image")) return { OG_LOGO_URL: "https://www.ironz.ma/logo-optimized.png" };
      if (name.endsWith("/category-taxonomy")) return { categoryUrl: () => undefined, subcategoryUrl: () => undefined };
      if (name.endsWith("/products")) return {
        isValidProductSlug: Boolean, productSlug: (p) => p.slug,
        getCachedProductBySlug: async () => product, getCachedAllProducts: async () => [],
      };
      throw Error(`Unexpected dependency: ${name}`);
    },
  });
  return exports;
}

test("explicit merchant SKUs retain spelling, short codes and leading zeros", () => {
  for (const sku of ["BMMF001", "0000008876", "11", "1", "AbC-123/4", "6abfd1df64c238de7b6b3d05"]) {
    assert.deepEqual(productIdentifierSchema({ sku }), { sku });
  }
});

test("missing SKU cannot fall back to MongoDB ID, backend ID or slug", () => {
  const product = { _id: "6abfd1df64c238de7b6b3d05", id: "backend-id", slug: "reference" };
  assert.deepEqual(productIdentifierSchema(product), {});
  assert.equal(product._id, "6abfd1df64c238de7b6b3d05");
  assert.equal(product.id, "backend-id");
  assert.equal(product.slug, "reference");
});

test("duplicate explicit SKUs remain a reportable conflict without silent reassignment", () => {
  const products = [{ _id: "first", sku: "DUPLICATE" }, { _id: "second", sku: "DUPLICATE" }];
  const values = products.map((product) => productIdentifierSchema(product).sku);
  assert.deepEqual(values, ["DUPLICATE", "DUPLICATE"]);
  assert.equal(new Set(values).size, 1);
});

test("malformed or empty values do not fabricate identifiers or throw", () => {
  for (const sku of [undefined, null, "", "   ", 0, 123, {}, [], "REF\u0000CODE", "REF\nCODE"]) {
    assert.deepEqual(productIdentifierSchema({ sku }), {});
  }
  assert.deepEqual(productIdentifierSchema({ sku: "  00012  " }), { sku: "00012" });
});

test("an explicitly established manufacturer part number is preserved as MPN", () => {
  assert.deepEqual(productIdentifierSchema({ sku: "STORE-001", mpn: "MAKER-009" }), { sku: "STORE-001", mpn: "MAKER-009" });
  assert.deepEqual(productIdentifierSchema({ mpn: "MAKER-009" }), { mpn: "MAKER-009" });
});

test("missing MPN and GTIN cannot be inferred from SKU, product name or references", () => {
  const product = { sku: "STORE-001", name: "Modèle 1234567890123", features: ["Référence : SBK166"], description: "Référence : XZY8841", _id: "internal" };
  assert.deepEqual(productIdentifierSchema(product), { sku: "STORE-001" });
  assert.deepEqual(productIdentifierSchema({}), {});
});

test("schema mapping leaves frozen application records untouched", () => {
  const product = Object.freeze({ _id: "internal", id: "legacy", slug: "reference", sku: "SKU-001", mpn: "MPN-001" });
  assert.deepEqual(productIdentifierSchema(product), { sku: "SKU-001", mpn: "MPN-001" });
  assert.equal(product._id, "internal");
  assert.equal(product.id, "legacy");
});

test("rendered Product preserves commercial identifiers, brand, reviews, Offer and metadata", async () => {
  const product = {
    _id: "internal", id: "legacy", slug: "reference", name: "Haltères IRONBULL",
    sku: "000123", mpn: "MAKER-009", description: "Description de référence.", image: "image.jpg",
    price: 299, inStock: true, stockQuantity: 4,
    reviews: [{ username: "Client", body: "Avis", rating: 4 }, { username: "Client B", body: "Avis B", rating: 5 }],
  };
  const page = pageFor(product);
  const props = { params: Promise.resolve({ slug: product.slug }) };
  const tree = await page.default(props);
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert.equal(schema.sku, "000123");
  assert.equal(schema.mpn, "MAKER-009");
  assert.equal(schema.name, product.name);
  assert.equal(schema.url, "https://www.ironz.ma/produit/reference");
  assert.equal(schema.description, product.description);
  assert.deepEqual(schema.image, [product.image]);
  assert.deepEqual(schema.brand, plain(productBrandSchema(product).brand));
  assert.deepEqual(schema.aggregateRating, plain(productAggregateRatingSchema(product).aggregateRating));
  assert.deepEqual(schema.offers, { ...productOfferSchema(product, schema.url).offers, itemCondition: "https://schema.org/NewCondition" });
  assert.equal(tree.props.children[2].props.initialProduct, product);
  assert.equal(tree.props.children[2].props.initialProduct._id, "internal");
  assert.equal(tree.props.children[2].props.initialProduct.id, "legacy");
  const metadata = await page.generateMetadata(props);
  assert.equal(metadata.title, productMetaTitle(product));
  assert.equal(metadata.description, productMetaDescription(product, product.description));
  assert.equal(metadata.alternates.canonical, "/produit/reference");
  assert.deepEqual(plain(metadata.robots), { index: true, follow: true });
  assert.equal(page.revalidate, 600);
  assert.equal(JSON.parse(tree.props.children[1].props.dangerouslySetInnerHTML.__html)["@type"], "BreadcrumbList");
});

test("a MongoDB-only product keeps internal identity without invented SKU or unknown brand", async () => {
  const product = { _id: "6abfd1df64c238de7b6b3d05", slug: "reference", name: "Accessoire", price: 100, inStock: true };
  const tree = await pageFor(product).default({ params: Promise.resolve({ slug: product.slug }) });
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  for (const key of ["sku", "mpn", "gtin", "brand", "aggregateRating"]) assert(!Object.hasOwn(schema, key));
  assert.equal(schema.offers.price, "100.00");
  assert.equal(schema.url, "https://www.ironz.ma/produit/reference");
  assert.equal(tree.props.children[2].props.initialProduct, product);
});

test("legacy schema helper no longer labels backend ID as SKU", () => {
  const exports = {};
  vm.runInNewContext(compile(read("../components/seo/schema-org.ts")), {
    exports, require: () => ({ productIdentifierSchema, productAggregateRatingSchema, productOfferSchema }),
  });
  const product = { id: "internal", slug: "reference", name: "Accessoire", price: 100, inStock: true };
  const schema = exports.generateProductSchema(product);
  assert(!Object.hasOwn(schema, "sku"));
  assert.equal(product.id, "internal");
  assert.equal(exports.generateProductSchema({ ...product, sku: "COMMERCIAL" }).sku, "COMMERCIAL");
});
