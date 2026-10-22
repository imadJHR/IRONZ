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
const root = fileURLToPath(new URL("../", import.meta.url));
const fixture = Array.from({ length: 107 }, (_, index) => ({
  _id: `product-${index}`, name: `Product ${index}`, price: 100,
  category: ["Equipements", "Supplément", "Accessoires"][index % 3],
}));

function harness(initial = fixture) {
  let products = structuredClone(initial);
  let failingPage;
  let expired = true;
  const modules = new Map();
  const snapshots = new Map();
  const calls = [];
  const caches = [];
  function load(filename) {
    const absolute = path.resolve(root, filename);
    if (modules.has(absolute)) return modules.get(absolute).exports;
    const loadedModule = { exports: {} };
    modules.set(absolute, loadedModule);
    const compiled = ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(compiled, {
      module: loadedModule, exports: loadedModule.exports, process: { env: {} },
      fetch: async (url, options) => {
        const request = new URL(url);
        const page = Number(request.searchParams.get("page"));
        const limit = Number(request.searchParams.get("limit"));
        calls.push({ page, limit, options });
        if (page === failingPage) return { ok: false, status: 503 };
        return { ok: true, json: async () => ({
          data: products.slice((page - 1) * limit, page * limit), total: products.length,
        }) };
      },
      require(name) {
        if (name === "next/cache") return { unstable_cache(callback, keyParts, options) {
          const key = JSON.stringify(keyParts);
          caches.push({ keyParts, options });
          // A model of successful snapshot retention, not a Next ISR integration test.
          return async () => {
            if (!expired && snapshots.has(key)) return snapshots.get(key);
            try {
              const result = await callback();
              snapshots.set(key, result);
              expired = false;
              return result;
            } catch (error) {
              if (snapshots.has(key)) return snapshots.get(key);
              throw error;
            }
          };
        } };
        if (name === "next/link") return function Link({ children, ...props }) {
          return React.createElement("a", props, children);
        };
        if (name === "next/image") return function Image(props) {
          const attributes = { ...props };
          delete attributes.fill;
          return React.createElement("img", attributes);
        };
        if (name === "lucide-react") return { ArrowLeft: () => null };
        if (name === "react/jsx-runtime") return require(name);
        if (name.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(absolute), `${name}.ts`)));
        throw new Error(`Unexpected import ${name}`);
      },
    });
    return loadedModule.exports;
  }
  const hub = load("lib/category-hub.ts");
  const page = load("app/categories/page.tsx");
  return { hub, page, calls, caches,
    fail(pageNumber) { failingPage = pageNumber; expired = true; },
    refresh(next) { products = structuredClone(next); failingPage = undefined; expired = true; },
    async html() { return renderToStaticMarkup(await page.default()); },
  };
}

test("complete paginated inventory uses one shared load and counts each category", async () => {
  const h = harness();
  const categories = await h.hub.getCategoryHub();
  assert.deepEqual(Array.from(categories, (c) => c.slug), ["equipements", "supplement", "accessoires"]);
  for (const category of categories) {
    assert.equal(category.productCount, fixture.filter((p) => p.category === category.name).length);
  }
  assert.equal(categories.reduce((sum, c) => sum + c.productCount, 0), fixture.length);
  assert.deepEqual(h.calls.map((c) => c.page), [1, 2]);
  assert.ok(h.calls.every((c) => c.limit === 100 && c.options.cache === "no-store"));
  await h.hub.getCategoryHub();
  assert.equal(h.calls.length, 2);
  const cache = h.caches.find((c) => c.keyParts.includes("ironz-category-hub-v1"));
  assert.equal(cache.options.revalidate, 3600);
  assert.equal(h.page.revalidate, 3600);
});

test("duplicate records across API pages do not inflate counts", async () => {
  const h = harness([...fixture, fixture[0], fixture[101]]);
  const categories = await h.hub.getCategoryHub();
  assert.equal(categories.reduce((sum, c) => sum + c.productCount, 0), fixture.length);
  const duplicate = h.hub.buildCategoryHub([fixture[0], fixture[0]]);
  assert.equal(duplicate[0].productCount, 1);
});

test("normalizes existing category identities and skips unknown destinations", async () => {
  const h = harness([
    { ...fixture[0], category: " Équipements " },
    { ...fixture[1], category: "SUPPLEMENT" },
    { ...fixture[2], category: "accessoires" },
    { ...fixture[3], category: "Unknown category" },
    { ...fixture[4], category: undefined },
  ]);
  const categories = await h.hub.getCategoryHub();
  assert.deepEqual(Array.from(categories, (c) => c.productCount), [1, 1, 1]);
  assert.equal(categories.length, 3);
});

test("known empty categories remain visible with zero counts", async () => {
  const h = harness([fixture[0]]);
  assert.deepEqual(Array.from(await h.hub.getCategoryHub(), (c) => c.productCount), [1, 0, 0]);
  const html = await h.html();
  assert.match(html, /1 produit</);
  assert.match(html, /0 produits</);
  assert.doesNotMatch(html, /Aucun produit disponible/);
});

test("successful empty catalog is distinct from an API failure", async () => {
  const h = harness([]);
  const html = await h.html();
  assert.match(html, /Aucun produit disponible pour le moment/);
  assert.equal((html.match(/0 produits</g) || []).length, 3);
  assert.equal((html.match(/href="\/categories\//g) || []).length, 3);
});

for (const failingPage of [1, 2]) {
  test(`cold API failure on page ${failingPage} rejects without publishing a partial hub`, async () => {
    const h = harness();
    h.fail(failingPage);
    await assert.rejects(h.page.default(), /Product API returned 503/);
    assert.equal(h.calls.length, failingPage);
  });
}

test("cache model retains last complete snapshot on failed refresh then recovers", async () => {
  const h = harness();
  const before = await h.hub.getCategoryHub();
  h.fail(2);
  assert.deepEqual(await h.hub.getCategoryHub(), before);
  const next = [...fixture.slice(2), { ...fixture[0], _id: "new-product", category: "Accessoires" }];
  h.refresh(next);
  const after = await h.hub.getCategoryHub();
  assert.equal(after.reduce((sum, c) => sum + c.productCount, 0), next.length);
  assert.notDeepEqual(after, before);
});

test("server HTML exposes each canonical category link once and preserves responsive layout", async () => {
  const html = await harness().html();
  for (const slug of ["equipements", "supplement", "accessoires"]) {
    assert.equal((html.match(new RegExp(`href="/categories/${slug}"`, "g")) || []).length, 1);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /grid-cols-1 md:grid-cols-2 lg:grid-cols-3/);
  assert.match(html, /Catégories de produits IRONZ/);
});

test("valid metadata remains unchanged", () => {
  const { metadata } = harness().page;
  assert.equal(metadata.title, "Catégories de produits fitness | IRONZ");
  assert.equal(metadata.description, "Explorez les grandes catégories IRONZ: équipements de fitness, accessoires de sport et suppléments.");
  assert.equal(metadata.alternates.canonical, "/categories");
  assert.equal(metadata.robots, undefined);
});
