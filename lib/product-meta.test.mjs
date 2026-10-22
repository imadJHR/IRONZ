import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { productBrandSchema } from "./product-brand.ts";
import { productAggregateRatingSchema } from "./product-review-summary.ts";
import { productOfferSchema } from "./product-offer.ts";
import { productIdentifierSchema } from "./product-identifiers.ts";
import {
  PRODUCT_META_OVERRIDES,
  productMetaDescription,
  productMetaTitle,
} from "./product-meta.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
function compile(relativePath, jsx) {
  return ts.transpileModule(readFileSync(new URL(relativePath, import.meta.url), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx,
      esModuleInterop: true,
    },
  }).outputText;
}

const products = {};
vm.runInNewContext(compile("./products.ts"), {
  exports: products,
  process: { env: {} },
  require(name) {
    if (name === "next/cache") return { unstable_cache: (callback) => callback };
    throw new Error(`Unexpected dependency: ${name}`);
  },
});
const pageCode = compile("../app/produit/[slug]/page.tsx", ts.JsxEmit.ReactJSX);

function metadataPage(product) {
  const exports = {};
  vm.runInNewContext(pageCode, {
    exports,
    console: { error() {} },
    require(name) {
      if (name === "react") return { cache: (callback) => callback };
      if (name === "react/jsx-runtime") return require(name);
      if (name === "next/navigation") return { notFound() { throw new Error("Not found"); } };
      if (name === "./ProductDetailClient") return { default() {} };
      if (name === "../../../lib/category-taxonomy") return {};
      if (name === "../../../lib/og-image") return { OG_LOGO_URL: "https://www.ironz.ma/logo-optimized.png" };
      if (name === "../../../lib/product-meta") return { productMetaDescription, productMetaTitle };
      if (name === "../../../lib/product-brand") return { productBrandSchema };
      if (name === "../../../lib/product-review-summary") return { productAggregateRatingSchema };
      if (name === "../../../lib/product-offer") return { productOfferSchema };
      if (name === "../../../lib/product-identifiers") return { productIdentifierSchema };
      if (name === "../../../lib/products") return {
        ...products,
        getCachedProductBySlug: async () => product,
        getCachedAllProducts: async () => [],
      };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return exports;
}

test("a title-only override cannot suppress the source description", () => {
  const slug = "metadata-test-title-only";
  PRODUCT_META_OVERRIDES[slug] = { title: "Titre spécifique" };
  try {
    const product = { slug, name: "Produit spécifique", description: "Description source précise." };
    assert.equal(productMetaDescription(product, product.description), product.description);
  } finally {
    delete PRODUCT_META_OVERRIDES[slug];
  }
});

test("all nine formerly title-only overrides now provide distinct descriptions", () => {
  const slugs = [
    "now-foods-chromium-picolinate-200-mcg-100-veg-capsules",
    "now-certified-organic-spirulina-500-mg-100-tablets",
    "now-milk-thistle-extract-150-mg-60-veg-capsules",
    "corde-a-sauter-fafa-sport-skipping-rope-fitnes",
    "bandeau-de-sport-headband-fitness-running",
    "ensemble-sport-homme-3-pieces-tenue-fitness-running",
    "sports-fitness-suit-homme-ensemble-compression-sport",
    "total-upper-body-workout-bar-barre-de-traction-multifonction-pour-porte",
    "beverly-hydrolyzed-professional-whey-protein-isolate",
  ];
  const descriptions = slugs.map((slug) => productMetaDescription({ slug, name: slug }, ""));
  descriptions.forEach((description) => {
    assert(description.trim());
    assert(!/livraison|garantie|certifié|MAD|DH\b/.test(description));
  });
  assert.equal(new Set(descriptions).size, slugs.length);
});

test("editorial titles retain dose, pack size and identifying product details", () => {
  const cases = [
    ["now-foods-chromium-picolinate-200-mcg-100-veg-capsules", ["NOW", "200 mcg", "100 capsules"]],
    ["now-certified-organic-spirulina-500-mg-100-tablets", ["NOW", "500 mg", "100 comprimés"]],
    ["now-milk-thistle-extract-150-mg-60-veg-capsules", ["NOW", "150 mg", "60 capsules"]],
    ["beverly-hydrolyzed-professional-whey-protein-isolate", ["Beverly", "Hydrolyzed Professional", "Isolate"]],
    ["total-upper-body-workout-bar-barre-de-traction-multifonction-pour-porte", ["traction", "multifonction", "porte"]],
  ];
  for (const [slug, details] of cases) {
    const title = productMetaTitle({ slug, name: slug });
    details.forEach((detail) => assert(title.includes(detail), detail));
    assert(title.endsWith(" | Prix au Maroc | IRONZ"));
  }
});

test("unknown long product names are preserved without arbitrary clipping", () => {
  const name = "Référence fabricant avec modèle, dosage, dimensions et conditionnement suffisamment longs pour dépasser un simple seuil de caractères";
  assert.equal(productMetaTitle({ name }), `${name} | Prix au Maroc | IRONZ`);
});

test("missing source copy uses a conservative product-specific fallback", () => {
  for (const description of [undefined, "", "   ", "<p> </p>"]) {
    const text = productMetaDescription({ name: "Référence sans fiche", description }, "Ancienne promesse de livraison.");
    assert(text.includes("Référence sans fiche"));
    assert(!/livraison|disponible|garantie|certifié/i.test(text));
  }
});

test("longDescription can supply source copy without inventing attributes", () => {
  const product = { name: "Accessoire", longDescription: "Description détaillée de l'accessoire." };
  assert.equal(productMetaDescription(product, product.longDescription), product.longDescription);
});

test("only excerpts demonstrably cut inside a word or number are repaired", () => {
  const product = { name: "Produit", description: "Produit avec poignée confortable et résistance réglable de 125 kg." };
  assert.equal(productMetaDescription(product, "Produit avec poignée confor"), "Produit avec poignée…");
  assert.equal(productMetaDescription(product, "Produit avec poignée confortable"), "Produit avec poignée confortable");
  assert.equal(productMetaDescription(product, "Produit avec poignée confortable "), "Produit avec poignée confortable ");
  const partialNumber = "Produit avec poignée confortable et résistance réglable de 12";
  assert.equal(productMetaDescription(product, partialNumber), "Produit avec poignée confortable et résistance réglable de…");
  assert.equal(productMetaDescription(product, "Résumé éditorial distinct."), "Résumé éditorial distinct.");
});

test("existing variant descriptions stay distinct and retain their verified weight", () => {
  const variants = [
    { slug: "les-halteres-ironbull-20-kg", name: "Haltères IRONBULL 20 kg", weight: "20 kg" },
    { slug: "les-halteres-ironbull-25-kg", name: "Haltères IRONBULL 25 kg", weight: "25 kg" },
    { slug: "kettle-bell-10-kg", name: "Kettlebell 10 kg", weight: "10 kg" },
    { slug: "kettle-bell-14-kg", name: "Kettlebell 14 kg", weight: "14 kg" },
  ];
  const descriptions = variants.map((product) => {
    const result = productMetaDescription(product, "");
    assert(result.includes(product.weight));
    return result;
  });
  assert.equal(new Set(descriptions).size, variants.length);
  assert.equal(new Set(variants.map(productMetaTitle)).size, variants.length);
});

test("sauce pack metadata does not assert an unverified brand or nutrition promise", () => {
  const result = productMetaDescription({ slug: "packs-sauces-healthy", name: "Pack sauces régimes" }, "");
  assert(result.includes("barbecue"));
  assert(result.includes("vinaigre de cidre"));
  assert(!/ServiVita|sans sucre|matières grasses|livraison/.test(result));
});

test("generateMetadata retains canonical, indexing, cache and social metadata across categories", async () => {
  const cases = [
    { slug: "tapis-roulant", name: "Tapis roulant", category: "Equipements", description: "Un tapis roulant pour l'entraînement." },
    { slug: "now-certified-organic-spirulina-500-mg-100-tablets", name: "NOW Spirulina 500 mg – 100 Tablets", category: "Supplément", description: "Spiruline en comprimés." },
    { slug: "les-halteres-ironbull-40-kg", name: "Haltères IRONBULL 40 kg", category: "Accessoires", description: "Haltères vendus en paire." },
  ];
  for (const product of cases) {
    const page = metadataPage(product);
    const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: product.slug }) });
    assert.equal(page.revalidate, 600);
    assert.equal(page.dynamicParams, true);
    assert.equal(new URL(metadata.alternates.canonical, "https://www.ironz.ma").href, `https://www.ironz.ma/produit/${product.slug}`);
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.robots.follow, true);
    assert.equal(metadata.title, productMetaTitle(product));
    assert(metadata.description.trim());
    assert.equal(metadata.openGraph.title, metadata.title);
    assert.equal(metadata.twitter.title, metadata.title);
    assert.equal(metadata.openGraph.description, metadata.description);
    assert.equal(metadata.twitter.description, metadata.description);
  }
});

test("a missing product retains its existing not-found metadata behavior", async () => {
  const page = metadataPage(null);
  const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: "absent-product" }) });
  assert.equal(metadata.title, "Produit introuvable");
  assert.equal(metadata.robots.index, false);
});
