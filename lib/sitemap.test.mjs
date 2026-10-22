import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://www.ironz.ma";
const api = "https://catalog.example.invalid/api";
const records = Array.from({ length: 101 }, (_, index) => ({
  _id: `fixture-${index}`,
  slug: `fixture-product-${index}`,
  name: `Fixture product ${index}`,
  price: 100 + index,
  category: "Accessoires",
  subCategory: "Accessoires de Fitness",
}));

function sitemapFixture(initialProducts = records) {
  let products = structuredClone(initialProducts);
  let failingPage = null;
  const modules = new Map();
  const snapshots = new Map();
  const calls = [];
  const errors = [];
  const cacheOptions = [];

  // Models a cache that retains its last successful snapshot on revalidation
  // failure. This is deliberately not a Vercel/ISR integration test or storage.
  function unstableCache(callback, keyParts, options) {
    const key = JSON.stringify(keyParts);
    cacheOptions.push({ keyParts, options });
    return async () => {
      try {
        const result = await callback();
        snapshots.set(key, structuredClone(result));
        return result;
      } catch (error) {
        if (snapshots.has(key)) return structuredClone(snapshots.get(key));
        throw error;
      }
    };
  }

  async function fetchPage(url, options) {
    const request = new URL(url);
    assert.equal(request.origin, new URL(api).origin);
    assert.equal(request.pathname, "/api/products");
    const page = Number(request.searchParams.get("page"));
    const limit = Number(request.searchParams.get("limit"));
    calls.push({ page, limit, options });
    if (page === failingPage) {
      return { ok: false, status: 503 };
    }
    return {
      ok: true,
      async json() {
        return {
          data: products.slice((page - 1) * limit, page * limit),
          total: products.length,
        };
      },
    };
  }

  // Execute the actual sitemap and its actual taxonomy/service/editorial
  // utilities. Only image imports, HTTP and the cache boundary are isolated.
  function load(filename) {
    const absolute = path.resolve(root, filename);
    if (/\.(png|jpe?g|webp|svg)$/i.test(absolute)) {
      return { src: "/fixture-image.png" };
    }
    if (modules.has(absolute)) return modules.get(absolute).exports;
    const loadedModule = { exports: {} };
    modules.set(absolute, loadedModule);
    const compiled = ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    }).outputText;
    vm.runInNewContext(compiled, {
      exports: loadedModule.exports,
      module: loadedModule,
      process: { env: { NEXT_PUBLIC_API_URL: api } },
      console: { error: (...args) => errors.push(args) },
      fetch: fetchPage,
      require(name) {
        if (name === "next/cache") return { unstable_cache: unstableCache };
        if (!name.startsWith(".")) throw new Error(`Unexpected import: ${name}`);
        let dependency = path.resolve(path.dirname(absolute), name);
        if (!path.extname(dependency)) {
          dependency = existsSync(`${dependency}.ts`)
            ? `${dependency}.ts`
            : path.join(dependency, "index.ts");
        }
        return load(dependency);
      },
    });
    return loadedModule.exports;
  }

  const sitemapModule = load("app/sitemap.ts");
  return {
    generate: sitemapModule.default,
    revalidate: sitemapModule.revalidate,
    calls,
    errors,
    cacheOptions,
    failPage(page) { failingPage = page; },
    setProducts(nextProducts) { products = structuredClone(nextProducts); },
    load,
  };
}

const urls = (routes) => Array.from(routes, (route) => route.url);
const productUrls = (routes) => urls(routes).filter((url) => url.startsWith(`${origin}/produit/`));
const sorted = (values) => Array.from(values).sort();

test("complete API success includes every product with existing cache policy", async () => {
  const fixture = sitemapFixture();
  const routes = await fixture.generate();
  assert.deepEqual(sorted(productUrls(routes)), sorted(records.map((p) => `${origin}/produit/${p.slug}`)));
  assert.deepEqual(fixture.calls.map(({ page }) => page), [1, 2]);
  assert.equal(fixture.revalidate, 3600);
  const snapshot = fixture.cacheOptions.find(({ keyParts }) => keyParts[0] === "ironz-sitemap-products");
  assert.equal(snapshot.options.revalidate, 3600);
  assert.deepEqual(Array.from(snapshot.options.tags), ["sitemap-products", "product-taxonomy"]);
  fixture.calls.forEach(({ options }) => assert.equal(options.next.revalidate, 3600));
});

test("second-page failure preserves a complete snapshot when the cache supports fallback", async () => {
  const fixture = sitemapFixture();
  const complete = urls(await fixture.generate());
  fixture.failPage(2);
  assert.deepEqual(urls(await fixture.generate()), complete);
  assert.equal(fixture.calls.at(-1).page, 2);
});

test("second-page failure without a snapshot rejects instead of returning partial success", async () => {
  const fixture = sitemapFixture();
  fixture.failPage(2);
  await assert.rejects(fixture.generate(), /Product API returned 503 for sitemap page 2/);
  assert.deepEqual(fixture.calls.map(({ page }) => page), [1, 2]);
  assert.equal(fixture.errors.length, 1);
});

test("API recovery after a cold failure restores the complete inventory", async () => {
  const fixture = sitemapFixture();
  fixture.failPage(2);
  await assert.rejects(fixture.generate());
  fixture.failPage(null);
  assert.equal(productUrls(await fixture.generate()).length, records.length);
});

test("successful regeneration replaces fallback data and removes a deleted product", async () => {
  const fixture = sitemapFixture();
  await fixture.generate();
  fixture.failPage(2);
  assert(productUrls(await fixture.generate()).includes(`${origin}/produit/${records[0].slug}`));
  fixture.setProducts(records.slice(1));
  fixture.failPage(null);
  const current = productUrls(await fixture.generate());
  assert(!current.includes(`${origin}/produit/${records[0].slug}`));
  assert.equal(current.length, records.length - 1);
});

test("successful regeneration automatically includes a new product", async () => {
  const fixture = sitemapFixture();
  await fixture.generate();
  const added = { ...records[0], _id: "new-fixture", slug: "new-fixture" };
  fixture.setProducts([...records, added]);
  assert(productUrls(await fixture.generate()).includes(`${origin}/produit/${added.slug}`));
});

test("every emitted URL retains the canonical HTTPS www hostname", async () => {
  const fixture = sitemapFixture();
  urls(await fixture.generate()).forEach((url) => assert.equal(new URL(url).origin, origin));
});

test("duplicate API records and shared route sources do not duplicate URLs", async () => {
  const fixture = sitemapFixture([...records, records[0]]);
  const all = urls(await fixture.generate());
  assert.equal(new Set(all).size, all.length);
  assert.equal(all.filter((url) => url.startsWith(`${origin}/produit/`)).length, records.length);
});

test("existing category, service, article, guide and core routes remain present", async () => {
  const fixture = sitemapFixture();
  const all = new Set(urls(await fixture.generate()));
  const { categories } = fixture.load("data/product.ts");
  const { articles } = fixture.load("lib/blog/index.ts");
  const { getSitemapServices } = fixture.load("lib/services.ts");
  const paths = [
    "", "/produit", "/contact", "/a-propos", "/services", "/guides", "/blog", "/faq",
    "/categories", "/demande-devis",
    "/guides/choisir-halteres-kettlebells-disques-maroc",
    "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
    "/guides/choisir-equipement-boxe-debutant-maroc",
    "/services/amenagement-salle/casablanca",
    "/categories/accessoires/accessoires-de-fitness",
    ...Array.from(categories, (category) => `/categories/${category.slug}`),
    ...Array.from(articles, (article) => `/blog/${article.slug}`),
    ...Array.from(getSitemapServices(), (service) => service.href),
  ];
  paths.forEach((pathname) => assert(all.has(`${origin}${pathname}`), pathname));
});
