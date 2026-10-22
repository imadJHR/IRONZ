import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = fileURLToPath(new URL("../", import.meta.url));
const parent = {
  equipements: ["Barres de Traction", "Machine de Fitness", "Poids libres"],
  supplement: ["Boisson énergisante", "Créatine", "Healthy Products", "Magnésium", "Mass Gainer", "Multivitamines & Minéraux", "Oméga-3 & Acides Gras", "Sauces healthy", "Vitamines & Minéraux", "Whey Protein", "Whey Protein Isolate"],
  accessoires: ["Accessoires de boxe", "Accessoires de fitness", "Accessoires de foot", "Accessoires de musculation", "Accessoires de natation", "Accessoires de sport", "Accessoires des machines", "Compacte et facile à transporter", "Packs Promo", "Poids libres", "Soins corporels", "Vêtements"],
};
const categoryNames = { equipements: "Equipements", supplement: "Supplément", accessoires: "Accessoires" };
const products = Object.entries(parent).flatMap(([category, subcategories]) => subcategories.map((subCategory, i) => ({
  _id: `${category}-${i}`, slug: `${category}-fixture-${i}`, name: `${subCategory} fixture`,
  price: 100, category: categoryNames[category], subCategory,
})));
products.push({ ...products.find((p) => p.subCategory === "Healthy Products"), _id: "healthy-case", slug: "healthy-case", subCategory: "Healthy products" });

function load(filename, cache = new Map()) {
  const absolute = path.resolve(root, filename);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {};
  cache.set(absolute, exports);
  const source = readFileSync(absolute, "utf8");
  vm.runInNewContext(ts.transpileModule(source + (source.includes("const SUBCATEGORY_SEO:") ? "\nexports.seo = SUBCATEGORY_SEO;" : ""), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, {
    exports,
    require(name) {
      if (name === "react" || name === "react/jsx-runtime") return require(name);
      if (name === "next/link") return "Link";
      if (name === "next/image") return "Image";
      if (name === "lucide-react") return { ArrowLeft: "ArrowLeft" };
      if (name === "next/navigation") return { notFound() { throw new Error("Not found"); } };
      if (name.endsWith("/CategoryProductsClient")) return "CategoryProductsClient";
      if (name.endsWith("/products")) return { getAllProducts: async () => products, productSlug: (p) => p.slug };
      if (name.endsWith("/category-hub")) return { getCategoryHub: async () => [] };
      if (name.endsWith("/og-image")) return { OG_LOGO_IMAGES: [], TWITTER_LOGO_IMAGES: [] };
      if (name.startsWith(".")) return load(path.relative(root, path.resolve(path.dirname(absolute), `${name}.ts`)), cache);
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return exports;
}
function nodes(tree, predicate) {
  if (!tree || typeof tree !== "object") return [];
  if (Array.isArray(tree)) return tree.flatMap((child) => nodes(child, predicate));
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props?.children, predicate)];
}
const taxonomy = load("lib/category-taxonomy.ts");
const subpage = load("app/categories/[slug]/[subSlug]/page.tsx");
const categoryPage = load("app/categories/[slug]/page.tsx");
const layout = load("app/categories/[slug]/layout.tsx");
const hub = load("app/categories/page.tsx");
const listing = (tree) => nodes(tree, (n) => n.type === "CategoryProductsClient")[0].props;
const params = (slug, subSlug) => ({ params: Promise.resolve({ slug, subSlug }) });

test("all existing route identities, counts, product URLs and category metadata remain valid", async () => {
  const metadata = [hub.metadata];
  for (const category of taxonomy.buildCategoryTaxonomy(products)) {
    const main = await layout.generateMetadata(params(category.slug));
    metadata.push(main);
    assert.equal(main.alternates.canonical, `/categories/${category.slug}`);
    const categoryTree = await categoryPage.default(params(category.slug));
    const categoryListing = listing(categoryTree);
    assert.equal(categoryListing.heading, category.heading);
    assert.equal(categoryListing.initialProducts.length, category.count);
    assert.equal(nodes(categoryTree, (n) => n.type === "CategoryProductsClient").length, 1);
    for (const subcategory of category.subcategories) {
      const route = `/categories/${category.slug}/${subcategory.slug}`;
      const seo = await subpage.generateMetadata(params(category.slug, subcategory.slug));
      metadata.push(seo);
      assert.equal(seo.alternates.canonical, route);
      assert.equal(seo.robots.index, true);
      assert.equal(seo.robots.follow, true);
      assert.equal(seo.openGraph.title, seo.title);
      assert.equal(seo.openGraph.description, seo.description);
      const tree = await subpage.default(params(category.slug, subcategory.slug));
      const props = listing(tree);
      assert.equal(props.initialProducts.length, subcategory.count);
      assert.equal(props.lockedCategoryName, category.name);
      assert.equal(props.lockedSubCategoryName, subcategory.name);
      assert.equal(nodes(tree, (n) => n.type === "CategoryProductsClient").length, 1);
      assert.equal(nodes(tree, (n) => n.type === "h1").length, 0);
      const schemas = nodes(tree, (n) => n.type === "script").map((n) => JSON.parse(n.props.dangerouslySetInnerHTML.__html));
      const itemList = schemas.find((s) => s["@type"] === "ItemList");
      assert.deepEqual(itemList.itemListElement.map((p) => p.url).sort(), Array.from(props.initialProducts, (p) => `https://www.ironz.ma/produit/${p.slug}`).sort());
      assert.equal(schemas.find((s) => s["@type"] === "BreadcrumbList").itemListElement.at(-1).item, `https://www.ironz.ma${route}`);
    }
  }
  assert.equal(new Set(metadata.map((m) => m.title)).size, metadata.length);
  assert.equal(new Set(metadata.map((m) => m.description)).size, metadata.length);
});

test("Healthy Products copy includes supplements and food without invented quantities or benefits", () => {
  const seo = subpage.seo["supplement/healthy-products"];
  assert.match(seo.title, /compléments et alimentation/);
  for (const name of ["NOW", "Applied Nutrition", "ServiVita", "Vitadulce"]) assert.ok(seo.intro.includes(name));
  assert.match(seo.heading, /compléments.*crème de riz.*sauces/);
  assert.doesNotMatch(seo.intro, /(?:9|5|14) produits|guérit|garantit|sans risque/);
});

test("category copy does not embed inventory counts or obsolete equipment", () => {
  const accessory = taxonomy.CATEGORY_DEFINITIONS.accessoires;
  assert.doesNotMatch(accessory.intro, /\b\d+ produits\b/);
  for (const key of ["accessoires/accessoires-de-fitness", "accessoires/poids-libres"]) {
    assert.doesNotMatch(subpage.seo[key].description, /\b\d+ références\b/);
  }
  const equipment = JSON.stringify([taxonomy.CATEGORY_DEFINITIONS.equipements, subpage.seo["equipements/machine-de-fitness"]]);
  assert.doesNotMatch(equipment, /panatta|leg curl|rack|65 000/i);
  assert.match(equipment, /presse à jambes/);
});

test("pack and sauce copy describes the correct listings without phantom products", () => {
  const packs = subpage.seo["accessoires/packs-promo"];
  assert.doesNotMatch(JSON.stringify(packs), /boxe|protège-dents/);
  assert.match(packs.intro, /ceinture.*sangles.*gants/);
  const sauces = subpage.seo["supplement/sauces-healthy"];
  assert.match(sauces.intro, /vinaigre de cidre/);
  assert.doesNotMatch(sauces.description, /chocolat|sans sucre|0%/);
});

test("nutrition-specific introductions replace the equipment fallback on creatine and magnesium", () => {
  for (const slug of ["creatine", "magnesium"]) {
    const seo = subpage.seo[`supplement/${slug}`];
    assert.match(seo.intro, /composition/);
    assert.doesNotMatch(seo.intro, /matériel|vous équiper/);
    assert.ok(seo.title.includes("au Maroc"));
  }
});

test("shared weights labels retain separate parents and distinct content", async () => {
  const equipment = await subpage.generateMetadata(params("equipements", "poids-libres"));
  const accessories = await subpage.generateMetadata(params("accessoires", "poids-libres"));
  assert.notEqual(equipment.title, accessories.title);
  assert.notEqual(equipment.alternates.canonical, accessories.alternates.canonical);
});
