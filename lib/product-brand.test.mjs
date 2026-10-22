import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { productBrand, productBrandSchema } from "./product-brand.ts";
import { productMetaDescription, productMetaTitle } from "./product-meta.ts";
import { productAggregateRatingSchema } from "./product-review-summary.ts";
import { productOfferSchema } from "./product-offer.ts";
import { productIdentifierSchema } from "./product-identifiers.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const pageSource = readFileSync(new URL("../app/produit/[slug]/page.tsx", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("../app/HomeClient.tsx", import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));

function transpile(source) {
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
}

function productPage(product) {
  const exports = {};
  vm.runInNewContext(transpile(pageSource), {
    exports,
    console: { error() {} },
    require(name) {
      if (name === "react") return { cache: (callback) => callback };
      if (name === "react/jsx-runtime") return require(name);
      if (name === "next/navigation") return { notFound() { throw new Error("Not found"); } };
      if (name === "./ProductDetailClient") return { default() {} };
      if (name === "../../../lib/product-brand") return { productBrandSchema };
      if (name === "../../../lib/product-review-summary") return { productAggregateRatingSchema };
      if (name === "../../../lib/product-offer") return { productOfferSchema };
      if (name === "../../../lib/product-identifiers") return { productIdentifierSchema };
      if (name === "../../../lib/product-meta") return { productMetaDescription, productMetaTitle };
      if (name === "../../../lib/og-image") return { OG_LOGO_URL: "https://www.ironz.ma/logo-optimized.png" };
      if (name === "../../../lib/category-taxonomy") return {
        categoryUrl: () => "/categories/accessoires",
        subcategoryUrl: () => "/categories/accessoires/accessoires-de-fitness",
      };
      if (name === "../../../lib/products") return {
        productSlug: (value) => value.slug,
        isValidProductSlug: (value) => Boolean(value),
        getCachedProductBySlug: async () => product,
        getCachedAllProducts: async () => [],
      };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return exports;
}

test("explicit API brands are preserved, including brands not in the catalog vocabulary", () => {
  assert.equal(productBrand({ brand: "  Marque documentée  ", name: "Accessoire" }), "Marque documentée");
  assert.equal(productBrand({ brand: "NOW Foods", name: "NOW Biotin" }), "NOW Foods");
});

test("third-party brands use explicit catalog identity or labelled brand evidence", () => {
  assert.equal(productBrand({ name: "Les Halteres IRONBULL 20 kg" }), "IRONBULL");
  assert.equal(productBrand({ name: "Hiro.Lab Whey" }), "Hiro.Lab");
  assert.equal(productBrand({ name: "C 21 Bike Adidas" }), "Adidas");
  assert.equal(productBrand({ name: "JUMP ROPE ROLLER", description: "Corde réglable.\r\nMarque : PAKKA" }), "PAKKA");
  assert.equal(productBrand({ name: "NOW Opti", features: ["Marque : NOW Foods"] }), "NOW");
  assert.equal(productBrand({ features: ["Marque : Optimum Nutrition (ON)"] }), "Optimum Nutrition");
});

test("IRONZ is retained only with product brand evidence", () => {
  assert.equal(productBrand({ name: "Paos de Frappe IRONZ" }), "IRONZ");
  assert.equal(productBrand({ brand: "IRONZ", name: "Paos" }), "IRONZ");
  assert.equal(productBrand({ name: "Accessoire", description: "Vendu chez IRONZ", features: ["Vendeur : IRONZ"] }), undefined);
});

test("unknown, generic, incomplete and malformed data do not fabricate a brand", () => {
  for (const product of [{}, { name: "Tapis yoga" }, { brand: " " }, { brand: "GENERIC" },
    { brand: "Sans marque" }, { brand: null, name: null, features: [null, 42], description: null }]) {
    assert.equal(productBrand(product), undefined);
    assert.deepEqual(productBrandSchema(product), {});
    assert.doesNotThrow(() => JSON.stringify({ "@type": "Product", ...productBrandSchema(product) }));
  }
});

test("conflicting brand evidence is omitted rather than resolved by guessing", () => {
  assert.equal(productBrand({ brand: "IRONZ", name: "Haltères IRONBULL" }), undefined);
  assert.equal(productBrand({ name: "Nike Adidas" }), undefined);
  assert.equal(productBrand({ name: "Nike Headbands", features: ["Marque : Reebok"] }), undefined);
  assert.equal(productBrand({ name: "Nike Headbands", features: ["Marque : Autre fabricant"] }), undefined);
});

test("compatibility, seller tags, slugs and free-text mentions do not establish a brand", () => {
  assert.equal(productBrand({ name: "Poulie compatible Adidas" }), undefined);
  assert.equal(productBrand({ name: "Pièce pour Nike" }), undefined);
  assert.equal(productBrand({ name: "Pièce pour Nike", brand: "Fabricant documenté" }), "Fabricant documenté");
  assert.equal(productBrand({ name: "Poulie - TECHNOGYM - 120mm" }), undefined);
  assert.equal(productBrand({ name: "Tapis", description: "Comme le modèle Nike, vendu chez IRONZ" }), undefined);
  assert.equal(productBrand({ name: "Accessoire", slug: "nike-accessoire", tags: ["Nike"] }), undefined);
  assert.equal(productBrand({ name: "NOWHERE", description: "Marque : GENERIC" }), undefined);
});

test("ambiguous product lines and spelling disagreements are not silently mapped", () => {
  for (const name of ["MAG GRIP", "SWEAT SHAPER", "Clean Body - Crème", "Boisson ABE", "Liverpro Super Bandes de resistance"]) {
    assert.equal(productBrand({ name }), undefined);
  }
  assert.equal(productBrand({ name: "Triangle", description: "Marque : HANDGRIP" }), undefined);
});

test("rendered detail JSON-LD preserves offers, ratings, breadcrumbs and canonical metadata", async () => {
  for (const [name, expectedBrand] of [["Haltères IRONBULL 20 kg", "IRONBULL"], ["Paos de Frappe IRONZ", "IRONZ"], ["Accessoire", undefined]]) {
    const product = {
      slug: "reference-test", name, price: 350, image: "https://example.com/product.jpg",
      description: "Description de référence.", sku: "SKU-TEST", category: "Accessoires",
      subCategory: "Accessoires de Fitness", stockQuantity: 0, inStock: true,
      rating: 1, reviewCount: 200, reviews: [{ rating: 4 }, { rating: 5 }],
    };
    const page = productPage(product);
    const tree = await page.default({ params: Promise.resolve({ slug: product.slug }) });
    const scripts = tree.props.children.filter((child) => child.type === "script");
    assert.equal(scripts.length, 2);
    const [schema, breadcrumb] = scripts.map((script) => JSON.parse(script.props.dangerouslySetInnerHTML.__html));
    assert.equal(schema["@type"], "Product");
    assert.equal(schema.name, name);
    assert.equal(schema.description, product.description);
    assert.deepEqual(schema.image, [product.image]);
    assert.equal(schema.sku, product.sku);
    assert.equal(schema.url, "https://www.ironz.ma/produit/reference-test");
    if (expectedBrand) assert.deepEqual(schema.brand, { "@type": "Brand", name: expectedBrand });
    else assert(!Object.hasOwn(schema, "brand"));
    assert.deepEqual(schema.offers, {
      "@type": "Offer", url: schema.url, priceCurrency: "MAD", price: "350.00",
      availability: "https://schema.org/OutOfStock", itemCondition: "https://schema.org/NewCondition",
    });
    assert.deepEqual(schema.aggregateRating, { "@type": "AggregateRating", ratingValue: 4.5, reviewCount: 2 });
    assert.equal(breadcrumb["@type"], "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement.length, 5);
    assert.equal(breadcrumb.itemListElement.at(-1).item, schema.url);
    const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: product.slug }) });
    assert.equal(metadata.alternates.canonical, "/produit/reference-test");
    assert.equal(metadata.title, productMetaTitle(product));
    assert.equal(metadata.description, productMetaDescription(product, product.description));
    assert.deepEqual(plain(metadata.robots), { index: true, follow: true });
    assert.equal(page.revalidate, 600);
  }
});

test("incomplete optional detail data still renders JSON-LD without brand or invented ratings", async () => {
  const page = productPage({ name: "Référence", slug: "reference", price: 10 });
  const tree = await page.default({ params: Promise.resolve({ slug: "reference" }) });
  const schema = JSON.parse(tree.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert(!Object.hasOwn(schema, "brand"));
  assert(!Object.hasOwn(schema, "aggregateRating"));
  assert.equal(schema.offers.price, "10.00");
  assert(!Object.hasOwn(schema.offers, "availability"));
});

test("the home Product builder follows the same policy and preserves its other fields", () => {
  const source = ts.createSourceFile("HomeClient.tsx", homeSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const builder = source.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "buildProductJsonLd");
  assert(builder);
  const context = { productBrandSchema, productAggregateRatingSchema, productOfferSchema, normalizeImage: (image) => image, SITE_URL: "https://www.ironz.ma" };
  vm.runInNewContext(transpile(`${builder.getText(source)}\nexports.build = buildProductJsonLd;`), { ...context, exports: context });
  const schema = context.build({ _id: "id", slug: "reference", name: "Nike Headbands", description: "Texte", image: "image.jpg", price: 100, inStock: true, stockQuantity: 1 });
  assert.deepEqual(plain(schema), {
    "@context": "https://schema.org", "@type": "Product", name: "Nike Headbands", description: "Texte",
    image: "image.jpg", url: "https://www.ironz.ma/produit/reference", brand: { "@type": "Brand", name: "Nike" },
    offers: { "@type": "Offer", priceCurrency: "MAD", price: "100.00", availability: "https://schema.org/InStock", url: "https://www.ironz.ma/produit/reference" },
  });
  assert(!Object.hasOwn(context.build({ name: "Accessoire", price: 100 }), "brand"));
});
