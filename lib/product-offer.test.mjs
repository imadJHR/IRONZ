import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { productOfferAvailability, productOfferSchema } from "./product-offer.ts";
import { productBrandSchema } from "./product-brand.ts";
import { productAggregateRatingSchema } from "./product-review-summary.ts";
import { productMetaDescription, productMetaTitle } from "./product-meta.ts";
import { productIdentifierSchema } from "./product-identifiers.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const jsx = require("react/jsx-runtime");
const { renderToStaticMarkup } = require("react-dom/server");
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));
const compile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const url = "https://www.ironz.ma/produit/reference";

function pageFor(product) {
  const exports = {};
  vm.runInNewContext(compile(read("../app/produit/[slug]/page.tsx")), {
    exports, console: { error() {} },
    require(name) {
      if (name === "react") return { cache: (callback) => callback };
      if (name === "react/jsx-runtime") return jsx;
      if (name === "next/navigation") return { notFound() { throw Error("Not found"); } };
      if (name === "./ProductDetailClient") return { default() {} };
      if (name.endsWith("/product-offer")) return { productOfferSchema };
      if (name.endsWith("/product-identifiers")) return { productIdentifierSchema };
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

const clientSource = ts.createSourceFile("ProductDetailClient.tsx", read("../app/produit/[slug]/ProductDetailClient.tsx"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let badge;
let stockExpression;
const buttons = [];
function visitClient(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(clientSource) === "isOutOfStock") stockExpression = node.initializer.getText(clientSource);
  if (ts.isJsxElement(node)) {
    const opening = node.openingElement.getText(clientSource);
    if (opening.includes('"flex items-center gap-3 px-4 py-3 rounded-xl border"')) badge = node;
    if (node.openingElement.tagName.getText(clientSource) === "button" && opening.includes("disabled={isOutOfStock}")) buttons.push(node);
  }
  ts.forEachChild(node, visitClient);
}
visitClient(clientSource);
assert(badge && stockExpression && buttons.length === 2);
const presentation = {};
vm.runInNewContext(compile(`exports.render = (product) => {
  const isOutOfStock = ${stockExpression};
  return {badge: (${badge.getText(clientSource)}), buttons: [${buttons.map((node) => node.getText(clientSource)).join(",")}]};
};`), {
  exports: presentation, require: () => jsx, cn: (...values) => values.filter(Boolean).join(" "),
  ShoppingCart: () => React.createElement("span"), handleAddToCart() {}, handleBuyNow() {},
});

test("ordinary price is emitted as a MAD Offer for the canonical product URL", () => {
  assert.deepEqual(productOfferSchema({ price: 299, inStock: true, stockQuantity: 2 }, url), {
    offers: { "@type": "Offer", url, priceCurrency: "MAD", price: "299.00", availability: "https://schema.org/InStock" },
  });
});

test("salePrice does not silently replace the price used by the existing product page", () => {
  const product = { price: 299, salePrice: 249, inStock: true };
  assert.equal(productOfferSchema(product, url).offers.price, "299.00");
  assert.equal(product.price, 299);
  assert.equal(product.salePrice, 249);
});

test("oldPrice and stored discount do not redefine the current Offer price", () => {
  const offer = productOfferSchema({ price: 649, oldPrice: 999, discount: 0, inStock: true }, url).offers;
  assert.equal(offer.price, "649.00");
  assert(!Object.hasOwn(offer, "oldPrice"));
  assert(!Object.hasOwn(offer, "discount"));
});

test("absence of a sale price requires no invented discount", () => {
  assert.equal(productOfferSchema({ price: 25, inStock: true }, url).offers.price, "25.00");
});

test("positive stock and explicit availability match enabled detail purchase controls", () => {
  const product = { price: 299, inStock: true, stockQuantity: 10 };
  const rendered = presentation.render(product);
  assert(renderToStaticMarkup(rendered.badge).includes("En stock"));
  assert(rendered.buttons.every((button) => button.props.disabled === false));
  assert.equal(productOfferAvailability(product), "https://schema.org/InStock");
});

test("explicitly unavailable products retain disabled purchase controls", () => {
  const product = { price: 299, inStock: false, stockQuantity: 5 };
  const rendered = presentation.render(product);
  assert(renderToStaticMarkup(rendered.badge).includes("Indisponible"));
  assert(rendered.buttons.every((button) => button.props.disabled === true));
  assert.equal(productOfferAvailability(product), "https://schema.org/OutOfStock");
});

test("contradictory zero quantity aligns badge and schema with existing disabled controls", () => {
  const product = { price: 26389, inStock: true, stockQuantity: 0 };
  const rendered = presentation.render(product);
  assert(renderToStaticMarkup(rendered.badge).includes("Indisponible"));
  assert(!renderToStaticMarkup(rendered.badge).includes("En stock"));
  assert(rendered.buttons.every((button) => button.props.disabled === true));
  assert.equal(productOfferSchema(product, url).offers.availability, "https://schema.org/OutOfStock");
  assert.deepEqual(product, { price: 26389, inStock: true, stockQuantity: 0 });
});

test("missing quantity is not interpreted as zero or used to disable purchase", () => {
  const product = { price: 299, inStock: true };
  assert.equal(productOfferAvailability(product), "https://schema.org/InStock");
  assert(presentation.render(product).buttons.every((button) => button.props.disabled === false));
});

test("unknown flags or malformed quantities do not invent schema availability", () => {
  for (const product of [{ price: 299 }, { price: 299, stockQuantity: 2 }, { price: 299, inStock: true, stockQuantity: -1 }]) {
    assert(!Object.hasOwn(productOfferSchema(product, url).offers, "availability"));
  }
});

test("invalid and missing prices do not fabricate a zero-priced or NaN Offer", () => {
  for (const price of [undefined, null, "", " ", "invalid", NaN, Infinity, -1, true]) {
    assert.deepEqual(productOfferSchema({ price }, url), {});
  }
  assert.equal(productOfferSchema({ price: 0 }, url).offers.price, "0.00");
  assert.equal(productOfferSchema({ price: "299.50" }, url).offers.price, "299.50");
});

test("a stale price in descriptive copy cannot overwrite the displayed/API price", () => {
  const product = { price: 299, description: "Disponible au prix de 249 DH.", inStock: true };
  assert.equal(productOfferSchema(product, url).offers.price, "299.00");
  assert.equal(product.description, "Disponible au prix de 249 DH.");
});

test("rendered Product Offer preserves identity, third-party brand, reviews and metadata", async () => {
  const product = { slug: "reference", name: "Haltères IRONBULL", description: "Description de référence.", image: "image.jpg", price: 299, inStock: true, stockQuantity: 2, reviews: [{ username: "Client", body: "Avis", rating: 4 }, { username: "Client B", body: "Avis B", rating: 5 }] };
  const page = pageFor(product);
  const props = { params: Promise.resolve({ slug: product.slug }) };
  const tree = await page.default(props);
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert.equal(schema.name, product.name);
  assert.equal(schema.description, product.description);
  assert.deepEqual(schema.image, [product.image]);
  assert.equal(schema.brand.name, "IRONBULL");
  assert.deepEqual(schema.aggregateRating, plain(productAggregateRatingSchema(product).aggregateRating));
  assert.deepEqual(schema.offers, { ...productOfferSchema(product, url).offers, itemCondition: "https://schema.org/NewCondition" });
  const metadata = await page.generateMetadata(props);
  assert.equal(metadata.title, productMetaTitle(product));
  assert.equal(metadata.description, productMetaDescription(product, product.description));
  assert.equal(metadata.alternates.canonical, "/produit/reference");
  assert.deepEqual(plain(metadata.robots), { index: true, follow: true });
  assert.equal(page.revalidate, 600);
  assert.equal(JSON.parse(tree.props.children[1].props.dangerouslySetInnerHTML.__html)["@type"], "BreadcrumbList");
});

test("unknown brand and no reviews remain absent while a valid Offer is retained", async () => {
  const product = { slug: "reference", name: "Accessoire", price: 100, inStock: true };
  const tree = await pageFor(product).default({ params: Promise.resolve({ slug: product.slug }) });
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert(!Object.hasOwn(schema, "brand"));
  assert(!Object.hasOwn(schema, "aggregateRating"));
  assert.equal(schema.offers.price, "100.00");
});

test("a rendered invalid-price Product retains identity without an invalid Offer", async () => {
  const product = { slug: "reference", name: "Accessoire" };
  const tree = await pageFor(product).default({ params: Promise.resolve({ slug: product.slug }) });
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert.equal(schema.name, "Accessoire");
  assert(!Object.hasOwn(schema, "offers"));
});

test("home and legacy JSON-LD builders share availability without inventing an expiry date", () => {
  const home = ts.createSourceFile("HomeClient.tsx", read("../app/HomeClient.tsx"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const builder = home.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "buildProductJsonLd");
  const homeExports = {};
  vm.runInNewContext(compile(`${builder.getText(home)}\nexports.build = buildProductJsonLd;`), {
    exports: homeExports, productBrandSchema, productAggregateRatingSchema, productOfferSchema,
    normalizeImage: (image) => image, SITE_URL: "https://www.ironz.ma",
  });
  const legacyExports = {};
  vm.runInNewContext(compile(read("../components/seo/schema-org.ts")), {
    exports: legacyExports, require: () => ({ productAggregateRatingSchema, productOfferSchema, productIdentifierSchema }),
  });
  for (const build of [homeExports.build, legacyExports.generateProductSchema]) {
    const schema = build({ slug: "reference", name: "Pack", price: 26389, inStock: true, stockQuantity: 0 });
    assert.equal(schema.offers.availability, "https://schema.org/OutOfStock");
    assert.equal(schema.offers.price, "26389.00");
    assert(!Object.hasOwn(schema.offers, "priceValidUntil"));
    assert(!Object.hasOwn(schema.offers, "shippingDetails"));
  }
});

test("home microdata keeps one numeric price and uses the existing detail availability", () => {
  const source = ts.createSourceFile("HomeClient.tsx", read("../app/HomeClient.tsx"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let offerElement;
  function visit(node) {
    if (!offerElement && ts.isJsxElement(node) && node.openingElement.getText(source).includes('itemProp="offers"')) offerElement = node;
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert(offerElement);
  const exports = {};
  vm.runInNewContext(compile(`exports.render = (product) => (${offerElement.getText(source)});`), {
    exports, require: () => jsx, productOfferAvailability, id: "fixture", addToCart() {},
    formatPrice: (value) => new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD" }).format(value),
    ShoppingCart: () => React.createElement("span"),
  });
  const html = renderToStaticMarkup(exports.render({ name: "Pack", price: 26389, inStock: true, stockQuantity: 0 }));
  assert.equal((html.match(/itemProp="price"/g) || []).length, 1);
  assert(html.includes('content="26389"'));
  assert(html.includes('content="https://schema.org/OutOfStock"'));
  assert(html.includes("Ajouter Pack au panier"));
});
