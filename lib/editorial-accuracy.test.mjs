import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parseDocument, DomUtils } = require("htmlparser2");
const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();
function Link({ children, ...props }) { return React.createElement("a", props, children); }
function load(filename) {
  const absolute = path.resolve(root, filename);
  if (modules.has(absolute)) return modules.get(absolute);
  const exports = {};
  modules.set(absolute, exports);
  let source = readFileSync(absolute, "utf8");
  if (filename === "app/guides/page.tsx") source += "\nexports.needsForTest = needs;";
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, {
    exports,
    require(name) {
      if (name === "react" || name === "react/jsx-runtime") return require(name);
      if (name === "next/link") return Link;
      if (name === "next/navigation") return { notFound() { throw new Error("Not found"); } };
      if (name === "./BlogHubClient") return function BlogHubClient() { return null; };
      if (name.startsWith(".")) {
        let dependency = path.resolve(path.dirname(absolute), name);
        if (!path.extname(dependency)) dependency = existsSync(`${dependency}.ts`) ? `${dependency}.ts`
          : existsSync(`${dependency}.tsx`) ? `${dependency}.tsx` : path.join(dependency, "index.ts");
        return load(path.relative(root, dependency).replaceAll("\\", "/"));
      }
      throw new Error(`Unexpected import ${name}`);
    },
  });
  return exports;
}
function nodes(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.children || []).flatMap((child) => nodes(child, predicate))];
}
function parsed(html) {
  const dom = parseDocument(html);
  return {
    text: DomUtils.textContent(dom).replace(/\s+/g, " "),
    h1: nodes(dom, (n) => n.name === "h1"),
    links: nodes(dom, (n) => n.name === "a").map((n) => ({ href: n.attribs.href, text: DomUtils.textContent(n) })),
    schemas: nodes(dom, (n) => n.name === "script" && n.attribs.type === "application/ld+json")
      .flatMap((n) => JSON.parse(DomUtils.textContent(n))),
  };
}
const blog = load("lib/blog/index.ts");
const articlePage = load("app/blog/[slug]/page.tsx");
const taxonomy = load("lib/category-taxonomy.ts");
const article = (slug) => blog.getArticleBySlug(slug);
const body = (entry) => [...entry.intro, ...entry.sections.flatMap((s) => [s.h2, ...(s.paragraphs || []), ...(s.list || [])]), ...entry.faq.map((f) => f.a)].join(" ");
const bikeFixture = [
  { name: "C 21 Bike Adidas", category: "Equipements", subCategory: "Machine de Fitness", format: "droit" },
  { name: "Vélo d’appartement semi-allongé", category: "Equipements", subCategory: "Machine de Fitness", format: "semi-allongé" },
  { name: "Vélo Sport Spinning HAPPYGAM", category: "Equipements", subCategory: "Machine de Fitness", format: "spinning" },
];
const weightFixture = [
  ...[8, 10, 12, 14, 16].map((weight) => ({ name: `KETTLE BELL ${weight} KG`, category: "Accessoires", subCategory: "Poids libres", weight })),
  ...[10, 40].map((weight) => ({ name: `Les Halteres IRONBULL ${weight} kg`, category: "Accessoires", subCategory: "Poids libres", weight })),
  { name: "Les Halteres IRONBULL 30 kg", category: "Equipements", subCategory: "Poids libres", weight: 30 },
];

const serviceEditorialClaims = [
  ["espace-enfant-sportif-maroc", /2[–-]5|6[–-]12|cinq minutes|règle sans exception|évitent? la plupart des incidents/iu],
  ["home-gym-maroc", /80\s*%|\d+\s*(?:à|–|-)?\s*\d*\s*m²|deux mois|inclus dans le service|première cause d’abandon|IRONZ installe/iu],
  ["amenagement-salle-sport-maroc", /4\s*à\s*6|150\s*000|400\s*000|IRONZ (?:réalise|prend en charge)|IRONZ installe|par des équipes spécialisées/iu],
  ["salle-sport-professionnelle-maroc", /4\s*à\s*6|120\s*à\s*180|150\s*000|400\s*000|un tiers|douze heures/iu],
  ["revetement-sol-sportif-maroc", /\d+\s*(?:à|–|-)?\s*\d*\s*(?:mm|%|kg|mètre)|réduit à la fois|aucun ne survit|c’est du carrelage déguisé/iu],
  ["amenagement-terrain-sport-maroc", /200\s*lux|deux saisons|première année|amortit vite|plus demandé|les plus rentables|demande la plus large|plus cher la séance/iu],
  ["personnalisation-accessoires-sport-maroc", /impression|broderie|gravure|vectoriel de préférence|C’est l’idéal|Oui, variables selon|La personnalisation s’ajoute|coût unitaire explose|moins volé|fidélise les adhérents/iu],
  ["equipement-musculation-maroc", /800\s*à\s*1\s*500|80\s*%|4\s*à\s*6\s*m²|30\s*m²/iu],
  ["sac-frappe-boxe-maroc", /le plus demandé|meilleur exutoire|meilleur ressenti|meilleur compromis/iu],
];

for (const [slug, unsupported] of serviceEditorialClaims) {
  test(`${slug}: unsupported service claims stay out of rendered copy and FAQ schema`, async () => {
    const entry = article(slug);
    const rendered = parsed(renderToStaticMarkup(await articlePage.default({ params: Promise.resolve({ slug }) })));
    assert.doesNotMatch(body(entry), unsupported);
    const faq = rendered.schemas.find((schema) => schema["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, entry.faq.length);
    for (const [index, question] of faq.mainEntity.entries()) {
      assert.equal(question.name, entry.faq[index].q);
      assert.equal(question.acceptedAnswer.text, entry.faq[index].a);
      assert.doesNotMatch(question.acceptedAnswer.text, unsupported);
      assert.ok(rendered.text.includes(question.acceptedAnswer.text));
    }
    assert.ok(rendered.links.some((link) => link.href === entry.cta.href && link.text === entry.cta.label));
  });
}

test("no blog article publishes an invented price range", () => {
  const priceRange = /\d[\d\s]*(?:à|–|-)\s?\d[\d\s]*(?:DH|MAD|dirhams)/iu;
  for (const entry of blog.articles) {
    assert.doesNotMatch(body(entry), priceRange, `${entry.slug}: invented price range`);
  }
});

test("no blog article uses unverified comparative marketing claims", () => {
  const comparative = /l[’']équipement le plus|le plus demandé|meilleur exutoire|meilleur ressenti|meilleur compromis|meilleur prix/iu;
  for (const entry of blog.articles) {
    assert.doesNotMatch(body(entry), comparative, `${entry.slug}: comparative claim`);
  }
});

test("professional brand mentions remain examples with explicit supply confirmation", () => {
  for (const slug of ["equipement-musculation-maroc", "amenagement-salle-sport-maroc", "salle-sport-professionnelle-maroc"]) {
    const entry = article(slug);
    const mentions = [...entry.sections.flatMap((s) => [...(s.paragraphs || []), ...(s.list || [])]), ...entry.faq.map((f) => f.a)]
      .filter((p) => /Matrix|Life Fitness|Topgym/.test(p));
    assert.ok(mentions.length > 0, "Useful general comparisons should remain");
    for (const mention of mentions) {
      assert.match(mention, /exemples/i);
      assert.match(mention, /confirmer/);
      assert.doesNotMatch(mention, /référencées? chez IRONZ|pièces disponibles|IRONZ référence des machines des marques/);
      assert.doesNotMatch(mention, /IRONZ ne (?:vend|fournit|peut)/);
    }
  }
  assert.doesNotMatch(JSON.stringify(blog.articles), /Panatta/i);
});

test("cardio copy separates represented formats from unconfirmed comparison models", async () => {
  const entry = article("velo-appartement-maroc");
  const guide = parsed(renderToStaticMarkup(React.createElement(load("app/guides/choisir-machine-cardio-tapis-velo-rameur-maroc/page.tsx").default)));
  for (const model of bikeFixture) {
    assert.ok(body(entry).includes(model.format));
    assert.ok(guide.text.includes(model.format));
  }
  assert.doesNotMatch(body(entry), /IRONZ référence quatre formats/);
  assert.doesNotMatch(guide.text, /quatre formats/);
  assert.match(entry.intro.join(" "), /elliptique.*comparaison générale.*confirmer/);
  assert.match(guide.text, /horizontal est un format de comparaison générale dont la disponibilité reste à confirmer/);
  assert.doesNotMatch(entry.metaTitle, /elliptique/);
  assert.match(entry.metaDescription, /elliptique.*comparaison générale/);
  assert.doesNotMatch(entry.cta.label, /elliptiques disponibles/);
  const html = parsed(renderToStaticMarkup(await articlePage.default({ params: Promise.resolve({ slug: entry.slug }) })));
  assert.ok(html.links.some((link) => link.text === entry.cta.label && link.href === entry.cta.href));
});

test("kettlebell CTA retains its anchor and reaches the parent-specific kettlebell inventory", () => {
  const cta = article("kettlebell-maroc").cta;
  assert.equal(cta.label, "Voir les kettlebells et poids libres IRONZ");
  const [, , parent, subcategory] = cta.href.split("/");
  assert.equal(cta.href, "/categories/accessoires/poids-libres");
  const matches = weightFixture.filter((p) => taxonomy.productMatchesSubcategory(p, parent, subcategory));
  assert.ok(matches.some((p) => /KETTLE BELL/.test(p.name)));
  assert.ok(matches.every((p) => p.category === "Accessoires"));
  assert.ok(!weightFixture.filter((p) => taxonomy.productMatchesSubcategory(p, "equipements", "poids-libres")).some((p) => /KETTLE BELL/.test(p.name)));
});

test("broad equipment links target the catalog and use an appropriate catalog label", () => {
  assert.equal(article("equipement-musculation-maroc").cta.href, "/produit");
  const guideIndex = load("app/guides/page.tsx");
  const need = guideIndex.needsForTest.find((n) => n.title === "Équipement de musculation");
  assert.equal(need.href, "/produit");
  assert.equal(need.label, "Voir le catalogue");
  assert.ok(existsSync(path.join(root, "app/produit/page.tsx")));
  assert.ok(parsed(renderToStaticMarkup(React.createElement(guideIndex.default))).links.some((n) => n.href === need.href && n.text.includes(need.label)));
});

test("IRONBULL range and kettlebell weights agree with the representative catalog fixture", () => {
  const guide = parsed(renderToStaticMarkup(React.createElement(load("app/guides/choisir-halteres-kettlebells-disques-maroc/page.tsx").default)));
  const ironbull = weightFixture.filter((p) => /IRONBULL/.test(p.name)).map((p) => p.weight);
  const range = guide.text.match(/haltères IRONBULL[^.]*?couvrent\s+(\d+) kg à (\d+) kg/);
  assert.ok(range);
  assert.equal(Number(range[1]), Math.min(...ironbull));
  assert.equal(Number(range[2]), Math.max(...ironbull));
  const kettlebells = weightFixture.filter((p) => /KETTLE BELL/.test(p.name)).map((p) => p.weight);
  const weights = guide.text.match(/kettlebells à\s+([\d\s,kget]+)\. Ce sont/);
  assert.ok(weights);
  assert.deepEqual(weights[1].match(/\d+/g).map(Number), kettlebells);
});

test("Olympic compatibility does not become an invented measured diameter or standalone product", () => {
  const guide = parsed(renderToStaticMarkup(React.createElement(load("app/guides/choisir-halteres-kettlebells-disques-maroc/page.tsx").default)));
  assert.match(guide.text, /Pourquoi 50 mm/);
  assert.match(guide.text, /compatibilité avec des barres olympiques/);
  assert.match(guide.text, /ne confirme pas à elle seule un alésage de 50 mm/);
  assert.doesNotMatch(guide.text, /disques olympiques 50 mm existent/);
});

test("all editorial routes retain their canonical, indexability, H1 and article/FAQ relationships", async () => {
  const routes = [{ route: "/blog", metadata: load("app/blog/page.tsx").metadata }];
  for (const entry of blog.articles) {
    const params = Promise.resolve({ slug: entry.slug });
    const seo = await articlePage.generateMetadata({ params });
    const rendered = parsed(renderToStaticMarkup(await articlePage.default({ params })));
    routes.push({ route: `/blog/${entry.slug}`, metadata: seo });
    assert.equal(rendered.h1.length, 1);
    const schema = rendered.schemas.find((s) => s["@type"] === "Article");
    assert.equal(schema.headline, entry.title);
    assert.equal(schema.datePublished, new Date(entry.date).toISOString());
    assert.equal(schema.dateModified, undefined);
    assert.equal(schema.author["@type"], "Organization");
    assert.equal(schema.author.name, "IRONZ");
    assert.equal(schema.publisher.name, "IRONZ");
    assert.equal(schema.mainEntityOfPage["@id"], `https://www.ironz.ma/blog/${entry.slug}`);
    const faq = rendered.schemas.find((s) => s["@type"] === "FAQPage");
    for (const question of faq.mainEntity) assert.ok(rendered.text.includes(question.acceptedAnswer.text));
  }
  const guideDirectories = readdirSync(path.join(root, "app/guides"), { withFileTypes: true }).filter((e) => e.isDirectory());
  routes.push({ route: "/guides", metadata: load("app/guides/layout.tsx").metadata });
  for (const directory of guideDirectories) {
    const filename = `app/guides/${directory.name}/page.tsx`;
    if (!existsSync(path.join(root, filename))) continue;
    const page = load(filename);
    routes.push({ route: `/guides/${directory.name}`, metadata: page.metadata });
    const rendered = parsed(renderToStaticMarkup(React.createElement(page.default)));
    assert.equal(rendered.h1.length, 1);
    const schema = rendered.schemas.find((s) => s["@type"] === "Article");
    assert.equal(schema.mainEntityOfPage["@id"], `https://www.ironz.ma/guides/${directory.name}`);
    assert.equal(schema.author.name, "IRONZ");
  }
  for (const { route, metadata } of routes) {
    assert.equal(metadata.alternates.canonical, route);
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.robots.follow, true);
  }
  assert.equal(new Set(routes.map((r) => r.metadata.title)).size, routes.length);
  assert.equal(new Set(routes.map((r) => r.metadata.description)).size, routes.length);
});
