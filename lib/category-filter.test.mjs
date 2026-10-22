import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const jsx = require("react/jsx-runtime");
const root = fileURLToPath(new URL("../", import.meta.url));
const healthy = Array.from({ length: 17 }, (_, i) => ({
  _id: `healthy-${i}`, slug: `healthy-${i}`, name: `Healthy fixture ${i}`,
  category: "Supplément", subCategory: i % 2 ? "Healthy products" : "Healthy Products",
  price: 10 + i, isFeatured: i % 3 === 0,
}));
const records = [...healthy,
  { ...healthy[0], _id: "other-parent", slug: "other-parent", category: "Accessoires" },
  { ...healthy[0], _id: "equipment-weights", slug: "equipment-weights", category: "Equipements", subCategory: "Poids libres" },
  { ...healthy[0], _id: "accessory-weights", slug: "accessory-weights", category: "Accessoires", subCategory: "Poids libres" },
  ...Array.from({ length: 100 }, (_, i) => ({ ...healthy[0], _id: `other-${i}`, slug: `other-${i}`, category: "Accessoires", subCategory: "Other" })),
];
const plain = (value) => JSON.parse(JSON.stringify(value));
function nodes(tree, predicate) {
  if (!tree || typeof tree !== "object") return [];
  if (Array.isArray(tree)) return tree.flatMap((child) => nodes(child, predicate));
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props?.children, predicate)];
}
function text(tree) {
  if (tree == null || typeof tree === "boolean") return "";
  if (Array.isArray(tree)) return tree.map(text).join("");
  return typeof tree === "object" ? text(tree.props?.children) : String(tree);
}

function harness(initial = records) {
  let catalog = structuredClone(initial);
  let failingPage;
  let cursor = 0;
  const slots = [];
  const calls = [];
  const modules = new Map();
  const react = {
    useState(value) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof value === "function" ? value() : value;
      return [slots[index], (next) => { slots[index] = typeof next === "function" ? next(slots[index]) : next; }];
    },
    useRef(value) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: value };
      return slots[index];
    },
    useEffect() {}, useMemo: (callback) => callback(), useCallback: (callback) => callback,
    useDeferredValue: (value) => value, memo: (component) => component,
  };
  function load(filename) {
    const absolute = path.resolve(root, filename);
    if (modules.has(absolute)) return modules.get(absolute).exports;
    const loadedModule = { exports: {} };
    modules.set(absolute, loadedModule);
    vm.runInNewContext(ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, {
      exports: loadedModule.exports, process: { env: {} },
      console: { error() {} }, setTimeout: () => 0,
      fetch: async (url) => {
        const request = new URL(url);
        const page = Number(request.searchParams.get("page"));
        const limit = Number(request.searchParams.get("limit"));
        calls.push({ page, limit });
        if (page === failingPage) return { ok: false, status: 503, statusText: "Unavailable" };
        return { ok: true, json: async () => ({ data: catalog.slice((page - 1) * limit, page * limit), total: catalog.length }) };
      },
      require(name) {
        if (name === "react") return react;
        if (name === "react/jsx-runtime") return jsx;
        if (name === "next/cache") return { unstable_cache: (callback) => callback };
        if (name === "next/link") return "Link";
        if (name === "next/navigation") return {
          notFound() { throw new Error("Not found"); }, useRouter: () => ({}),
          useSearchParams: () => ({ get: () => null }), useParams: () => ({ slug: "supplement" }),
        };
        if (name === "lucide-react") return new Proxy({}, { get: (_, key) => String(key) });
        if (name === "framer-motion") return { AnimatePresence: "AnimatePresence", motion: new Proxy({}, { get: (_, key) => `motion.${String(key)}` }) };
        if (name.endsWith("/cart-context")) return { useCart: () => ({ addToCart() { throw new Error("Unexpected cart operation"); } }) };
        if (name.endsWith("/favorites-context")) return { useFavorites: () => ({}) };
        if (name.endsWith("/utils")) return { cn: (...values) => values.filter(Boolean).join(" ") };
        if (name.endsWith("/image-url")) return { optimizeImageUrl: (url) => url };
        if (name.endsWith("/og-image")) return { OG_LOGO_IMAGES: [], TWITTER_LOGO_IMAGES: [] };
        if (name.includes("/components/ui/")) return new Proxy({}, { get: (_, key) => String(key) });
        if (name === "../CategoryProductsClient") return "CategoryProductsClient";
        if (name.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(absolute), `${name}.ts`)));
        throw new Error(`Unexpected dependency ${name}`);
      },
    });
    return loadedModule.exports;
  }
  const taxonomy = load("lib/category-taxonomy.ts");
  const server = load("app/categories/[slug]/[subSlug]/page.tsx");
  const client = load("app/categories/[slug]/CategoryProductsClient.tsx");
  return { taxonomy, calls, server,
    async serverTree(category = "supplement", subcategory = "healthy-products") {
      return server.default({ params: Promise.resolve({ slug: category, subSlug: subcategory }) });
    },
    render(props) { cursor = 0; return client.default(props); },
    refresh(next) { catalog = structuredClone(next); failingPage = undefined; },
    fail(page) { failingPage = page; },
  };
}
const listingProps = (tree) => nodes(tree, (n) => n.type === "CategoryProductsClient")[0].props;
const cards = (tree) => nodes(tree, (n) => n.props?.product).map((n) => n.props.product);
const ids = (products) => products.map((p) => p._id).sort();
const refreshButton = (tree) => nodes(tree, (n) => n.props?.["aria-label"] === "Rafraîchir maintenant")[0];

test("case variants share the existing server identity without fuzzy merging", () => {
  const { taxonomy } = harness();
  assert.equal(taxonomy.taxonomySlug("Healthy Products"), taxonomy.taxonomySlug("Healthy products"));
  assert.equal(taxonomy.taxonomySlug("  HÉALTHY Products  "), "healthy-products");
  assert.notEqual(taxonomy.taxonomySlug("Healthy Product"), "healthy-products");
});

test("server inventory, client count, pagination, discovery and ItemList agree", async () => {
  const h = harness();
  const serverTree = await h.serverTree();
  const props = listingProps(serverTree);
  assert.deepEqual(ids(plain(props.initialProducts)), ids(healthy));
  const tree = h.render(props);
  assert.match(text(nodes(tree, (n) => n.type === "h1")[0]), new RegExp(`\\(${healthy.length}\\)`));
  const page1 = cards(tree);
  assert.equal(page1.length, 12);
  nodes(tree, (n) => n.props?.["aria-label"] === "Page 2")[0].props.onClick();
  const all = [...page1, ...cards(h.render(props))];
  assert.deepEqual(ids(plain(all)), ids(healthy));
  assert.equal(new Set(all.map((p) => p._id)).size, healthy.length);
  const discovery = nodes(tree, (n) => n.type === "nav" && n.props["aria-label"] === "Liens produits de cette sélection")[0];
  const hrefs = nodes(discovery, (n) => n.type === "Link").map((n) => n.props.href).sort();
  assert.deepEqual(hrefs, healthy.map((p) => `/produit/${p.slug}`).sort());
  const schemas = nodes(serverTree, (n) => n.type === "script").map((n) => JSON.parse(n.props.dangerouslySetInnerHTML.__html));
  const list = schemas.find((s) => s["@type"] === "ItemList");
  assert.deepEqual(list.itemListElement.map((p) => new URL(p.url).pathname).sort(), hrefs);
  const breadcrumb = schemas.find((s) => s["@type"] === "BreadcrumbList");
  assert.equal(breadcrumb.itemListElement.at(-1).item, "https://www.ironz.ma/categories/supplement/healthy-products");
});

test("filter options group capitalization variants and reflect the locked selection", async () => {
  const h = harness();
  const props = listingProps(await h.serverTree());
  const tree = h.render(props);
  const content = nodes(tree, (n) => typeof n.type === "function" && n.type.name === "FilterContent")[0].type();
  const checkboxes = nodes(content, (n) => n.type === "Checkbox" && n.props.id.startsWith("sub-"));
  assert.equal(checkboxes.length, 1);
  assert.equal(checkboxes[0].props.checked, true);
  assert.equal(checkboxes[0].props.disabled, true);
});

test("category-page selection includes both variants and toggles the normalized option", () => {
  const h = harness();
  const props = { initialProducts: records, initialCategoryName: "Supplément", lockedCategoryName: "Supplément" };
  let tree = h.render(props);
  const filter = nodes(tree, (n) => typeof n.type === "function" && n.type.name === "FilterContent")[0].type();
  nodes(filter, (n) => n.type === "div" && n.props.onClick && /^Healthy/.test(text(n)))[0].props.onClick();
  tree = h.render(props);
  assert.match(text(nodes(tree, (n) => n.type === "h1")[0]), new RegExp(`\\(${healthy.length}\\)`));
  assert.ok(cards(tree).every((p) => p.category === "Supplément"));
  const selected = nodes(tree, (n) => typeof n.type === "function" && n.type.name === "FilterContent")[0].type();
  assert.equal(nodes(selected, (n) => n.type === "Checkbox" && n.props.id.startsWith("sub-"))[0].props.checked, true);
  nodes(selected, (n) => n.type === "div" && n.props.onClick && /^Healthy/.test(text(n)))[0].props.onClick();
  assert.equal(nodes(h.render(props), (n) => n.type === "Badge" && /^Healthy/.test(text(n))).length, 0);
});

test("identical subcategory names under different parents remain separate", async () => {
  const h = harness();
  for (const [parent, expected] of [["equipements", "equipment-weights"], ["accessoires", "accessory-weights"]]) {
    const props = listingProps(await h.serverTree(parent, "poids-libres"));
    assert.deepEqual(ids(plain(props.initialProducts)), [expected]);
  }
  assert.ok(listingProps(await h.serverTree()).initialProducts.every((p) => p.category === "Supplément"));
});

test("sorting, search and price filters remain effective after normalization", async () => {
  const h = harness();
  const props = listingProps(await h.serverTree());
  let tree = h.render(props);
  nodes(tree, (n) => n.type === "DropdownMenuItem" && text(n).includes("Prix croissant"))[0].props.onClick();
  tree = h.render(props);
  const prices = cards(tree).map((p) => p.price);
  assert.deepEqual(prices, [...prices].sort((a, b) => a - b));
  nodes(tree, (n) => n.type === "Input")[0].props.onChange({ target: { value: healthy[0].name } });
  tree = h.render(props);
  assert.deepEqual(ids(plain(cards(tree))), [healthy[0]._id]);
  nodes(tree, (n) => n.type === "Input")[0].props.onChange({ target: { value: "" } });
  const filter = nodes(h.render(props), (n) => typeof n.type === "function" && n.type.name === "FilterContent")[0].type();
  nodes(filter, (n) => n.type === "Slider")[0].props.onValueChange([12, 14]);
  assert.deepEqual(ids(plain(cards(h.render(props)))), ids(healthy.filter((p) => p.price >= 12 && p.price <= 14)));
});

test("paginated refresh deduplicates products and includes additions and removals", async () => {
  const h = harness();
  const props = listingProps(await h.serverTree());
  const added = { ...healthy[0], _id: "added", slug: "added", price: 15 };
  h.refresh([...records.filter((p) => p._id !== healthy[0]._id), added, healthy[1]]);
  await refreshButton(h.render(props)).props.onClick();
  const tree = h.render(props);
  const first = cards(tree);
  nodes(tree, (n) => n.props?.["aria-label"] === "Page 2")[0].props.onClick();
  assert.deepEqual(ids(plain([...first, ...cards(h.render(props))])), ids([...healthy.slice(1), added]));
  assert.ok(h.calls.some((c) => c.limit === 50 && c.page > 1));
});

test("API page failure preserves the prior client inventory and server fails without partial success", async () => {
  const h = harness();
  const props = listingProps(await h.serverTree());
  const before = cards(h.render(props));
  h.fail(2);
  await refreshButton(h.render(props)).props.onClick();
  assert.deepEqual(ids(plain(cards(h.render(props)))), ids(plain(before)));
  await assert.rejects(h.serverTree(), /Product API returned 503/);
});

test("canonical, indexability and valid metadata remain unchanged", async () => {
  const h = harness();
  const metadata = await h.server.generateMetadata({ params: Promise.resolve({ slug: "supplement", subSlug: "healthy-products" }) });
  assert.equal(metadata.alternates.canonical, "/categories/supplement/healthy-products");
  assert.deepEqual(plain(metadata.robots), { index: true, follow: true });
  assert.equal(metadata.title, "Healthy Products : compléments et alimentation | IRONZ");
});
