import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { productReviewSummary, productAggregateRatingSchema } from "./product-review-summary.ts";
import { productBrandSchema } from "./product-brand.ts";
import { productMetaDescription, productMetaTitle } from "./product-meta.ts";
import { productOfferSchema } from "./product-offer.ts";
import { productIdentifierSchema } from "./product-identifiers.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const jsx = require("react/jsx-runtime");
const plain = (value) => JSON.parse(JSON.stringify(value));
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const compile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const utilities = {};
vm.runInNewContext(compile(read("./reviews.ts")), { exports: utilities, process: { env: {} } });

function renderedSection(reviews, extra = {}) {
  const exports = {};
  const effects = [];
  vm.runInNewContext(compile(read("../components/reviews/reviews-section.tsx")), {
    exports,
    require(name) {
      if (name === "react") return {
        useState: (value) => [value, () => {}], useMemo: (callback) => callback(),
        useCallback: (callback) => callback, useEffect: (callback) => effects.push(callback),
      };
      if (name === "react/jsx-runtime") return jsx;
      if (name === "@clerk/clerk-react") return { useUser: () => ({ isSignedIn: false, isLoaded: false }) };
      if (name === "@clerk/nextjs") return { SignInButton: ({ children }) => children, SignUpButton: ({ children }) => children };
      if (name.endsWith("/icons")) return new Proxy({}, { get: () => () => React.createElement("span") });
      if (name.endsWith("/star-input")) return { StarInput: () => null };
      if (name.endsWith("/product-review-summary")) return { productReviewSummary };
      if (name.endsWith("/reviews")) return utilities;
      throw Error(`Unexpected dependency: ${name}`);
    },
  });
  const html = renderToStaticMarkup(exports.ReviewsSection({ productId: "fixture", initialReviews: reviews, ...extra }));
  return { html, effects };
}

function pageFor(product) {
  const exports = {};
  vm.runInNewContext(compile(read("../app/produit/[slug]/page.tsx")), {
    exports, console: { error() {} },
    require(name) {
      if (name === "react") return { cache: (callback) => callback };
      if (name === "react/jsx-runtime") return jsx;
      if (name === "next/navigation") return { notFound() { throw Error("Not found"); } };
      if (name === "./ProductDetailClient") return { default() {} };
      if (name.endsWith("/product-review-summary")) return { productAggregateRatingSchema };
      if (name.endsWith("/product-offer")) return { productOfferSchema };
      if (name.endsWith("/product-identifiers")) return { productIdentifierSchema };
      if (name.endsWith("/product-brand")) return { productBrandSchema };
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

const records = [
  { _id: "r1", username: "Client A", title: "Première expérience", body: "Commentaire de référence un.", rating: 4, verified: false, date: "2026-01-02T12:00:00Z" },
  { _id: "r2", username: "Client B", title: "Deuxième expérience", body: "Commentaire de référence deux.", rating: 5, date: "2026-01-03T12:00:00Z" },
];

test("detailed records determine both rating and count instead of legacy counters", () => {
  const product = { reviews: records, rating: 1, reviewCount: 42 };
  assert.deepEqual(productReviewSummary(product), { count: 2, average: 4.5 });
  assert.deepEqual(productAggregateRatingSchema(product), { aggregateRating: { "@type": "AggregateRating", ratingValue: 4.5, reviewCount: 2 } });
});

test("no reviews and legacy-only ratings cannot create an aggregate", () => {
  for (const product of [{}, { reviews: [] }, { rating: 5, reviewCount: 117 }, { reviews: null }]) {
    assert.deepEqual(productReviewSummary(product), { count: 0, average: undefined });
    assert.deepEqual(productAggregateRatingSchema(product), {});
  }
});

test("false, true and unknown verification do not invent purchase evidence or suppress a rating", () => {
  for (const verified of [false, true, undefined]) {
    const review = { ...records[0], verified };
    assert.equal(productAggregateRatingSchema({ reviews: [review] }).aggregateRating.reviewCount, 1);
    const { html } = renderedSection([review]);
    assert(html.includes("1 avis client sur ce produit"));
    assert(!/avis vérifié|achat vérifié|client vérifié/i.test(html));
    assert(html.includes(review.username));
    assert(html.includes(review.body));
  }
});

test("review display retains names, dates and bodies with a neutral summary", () => {
  const { html } = renderedSection(records);
  assert(html.includes("2 avis clients sur ce produit"));
  assert(html.includes("4.5"));
  for (const review of records) {
    assert(html.includes(review.username));
    assert(html.includes(review.title));
    assert(html.includes(review.body));
  }
  assert(html.includes(utilities.formatReviewDate(records[0].date)));
});

test("an empty review UI ignores declared historical counters", () => {
  const { html } = renderedSection([], { declaredRating: 4.7, declaredReviewCount: 117 });
  assert(html.includes("Aucun avis pour le moment"));
  assert(!html.includes("117 avis"));
  assert(!html.includes("4.7"));
});

test("review state is reported back to the product summary without a write request", () => {
  let updated;
  const { effects } = renderedSection(records, { onReviewsChange: (rows) => { updated = rows; } });
  effects.forEach((effect) => effect());
  assert.equal(updated, records);
});

test("uncertain association is not repaired or suppressed using comment keywords", () => {
  const reviews = [{ ...records[0], body: "Harnais de résistance pour courir." }];
  const snapshot = JSON.stringify(reviews);
  assert.equal(productReviewSummary({ reviews }).count, 1);
  assert(renderedSection(reviews).html.includes(reviews[0].body));
  assert.equal(JSON.stringify(reviews), snapshot);
});

test("invalid numeric ratings cannot create invalid schema and review text is retained", () => {
  const reviews = [{ ...records[0], rating: 6 }];
  assert.deepEqual(productAggregateRatingSchema({ reviews }), {});
  assert(renderedSection(reviews).html.includes(reviews[0].body));
});

test("rendered Product schema and visible review summary use the same records", async () => {
  const product = { slug: "fixture", name: "Haltères IRONBULL", image: "image.jpg", description: "Description", price: 100, inStock: false, reviews: records, rating: 1, reviewCount: 42 };
  const page = pageFor(product);
  const props = { params: Promise.resolve({ slug: product.slug }) };
  const tree = await page.default(props);
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert.deepEqual(schema.aggregateRating, plain(productAggregateRatingSchema(product).aggregateRating));
  const { html } = renderedSection(records);
  assert(html.includes(`${schema.aggregateRating.reviewCount} avis clients sur ce produit`));
  assert(html.includes(String(schema.aggregateRating.ratingValue)));
  assert.deepEqual(schema.brand, { "@type": "Brand", name: "IRONBULL" });
  assert.equal(schema.offers.price, "100.00");
  assert.equal(schema.offers.priceCurrency, "MAD");
  assert.equal(schema.offers.availability, "https://schema.org/OutOfStock");
  assert.equal(schema.url, "https://www.ironz.ma/produit/fixture");
  assert(!Object.hasOwn(schema, "review"));
  const metadata = await page.generateMetadata(props);
  assert.equal(metadata.alternates.canonical, "/produit/fixture");
  assert.equal(metadata.title, productMetaTitle(product));
  assert.equal(metadata.description, productMetaDescription(product, "Description"));
});

test("rendered legacy-only Product has no aggregate while retaining its identity", async () => {
  const product = { slug: "legacy", name: "Produit IRONZ", price: 10, rating: 4.7, reviewCount: 117 };
  const tree = await pageFor(product).default({ params: Promise.resolve({ slug: product.slug }) });
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert(!Object.hasOwn(schema, "aggregateRating"));
  assert.equal(schema.name, product.name);
  assert.equal(schema.brand.name, "IRONZ");
});

test("the home featured rating displays the record-derived score and count", () => {
  const source = ts.createSourceFile("HomeClient.tsx", read("../app/HomeClient.tsx"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let expression;
  function visit(node) {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken &&
      node.left.getText(source) === "featuredReviewSummary.average !== undefined") expression = node;
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert(expression);
  const exports = {};
  vm.runInNewContext(compile(`exports.render = (featuredReviewSummary) => (${expression.getText(source)});`), {
    exports, Star: () => React.createElement("span"), require: () => jsx,
  });
  const html = renderToStaticMarkup(exports.render(productReviewSummary({ reviews: records })));
  assert(html.includes("4.5"));
  assert(html.includes("2"));
  assert(html.includes("avis clients"));
  assert(!html.includes("4.9"));
  assert.equal(renderToStaticMarkup(exports.render(productReviewSummary({ rating: 5, reviewCount: 42 }))), "");
});

test("home and legacy schema generators cannot fabricate 42 ratings or legacy aggregates", () => {
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
    const product = { slug: "fixture", name: "Produit IRONZ", price: 100, rating: 1, reviewCount: 42, reviews: records };
    const schema = build(product);
    assert.deepEqual(plain(schema.aggregateRating), productAggregateRatingSchema(product).aggregateRating);
    assert(!JSON.stringify(schema).includes('"ratingCount":42'));
    const withoutRecords = { ...product, reviews: [] };
    assert(!Object.hasOwn(build(withoutRecords), "aggregateRating"));
  }
});
