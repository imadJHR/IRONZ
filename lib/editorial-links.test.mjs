import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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
function Link({ children, ...props }) { return React.createElement("a", props, children); }
function loader(articleOverride) {
  const modules = new Map();
  function load(file) {
    const absolute = path.resolve(root, file);
    if (modules.has(absolute)) return modules.get(absolute);
    const exports = {};
    modules.set(absolute, exports);
    vm.runInNewContext(ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, {
      exports,
      require(name) {
        if (name === "react" || name === "react/jsx-runtime") return require(name);
        if (name === "next/link") return Link;
        if (name === "next/navigation") return { notFound() { throw new Error("Not found"); } };
        if (name === "lucide-react" || name === "react-icons/io") {
          return new Proxy({}, { get: () => function Icon() { return null; } });
        }
        if (name.endsWith("/service-contact-form")) return function ContactForm() { return null; };
        if (articleOverride && name === "../../../lib/blog") return {
          getArticleBySlug: () => articleOverride, getRelatedArticles: () => [], articles: [articleOverride],
        };
        if (name.startsWith(".")) {
          let dependency = path.resolve(path.dirname(absolute), name);
          if (!path.extname(dependency)) dependency = existsSync(`${dependency}.ts`) ? `${dependency}.ts`
            : existsSync(`${dependency}.tsx`) ? `${dependency}.tsx` : path.join(dependency, "index.ts");
          return load(path.relative(root, dependency));
        }
        throw new Error(`Unexpected import ${name}`);
      },
    });
    return exports;
  }
  return load;
}
function nodes(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.children || []).flatMap((child) => nodes(child, predicate))];
}
function parents(node) { return node.parent ? [node.parent, ...parents(node.parent)] : []; }
const text = (node) => DomUtils.textContent(node);
const load = loader();
const articles = load("lib/blog/index.ts").articles;
const articlePage = load("app/blog/[slug]/page.tsx");
async function document(entry, page = articlePage) {
  return parseDocument(renderToStaticMarkup(await page.default({ params: Promise.resolve({ slug: entry.slug }) })));
}
const expected = [
  ["equipement-musculation-maroc", "/guides/choisir-halteres-kettlebells-disques-maroc", "guide des haltères, kettlebells et disques", null],
  ["equipement-musculation-maroc", "/blog/barre-traction-maroc", "choisir une barre de traction", "Le rack ou power rack : pour les charges lourdes"],
  ["tapis-de-course-maroc", "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc", "comparer tapis roulant, vélo et rameur", null],
  ["velo-appartement-maroc", "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc", "choisir entre vélo, tapis roulant et rameur", null],
  ["kettlebell-maroc", "/guides/choisir-halteres-kettlebells-disques-maroc", "comparer kettlebells, haltères et disques", null],
  ["sac-frappe-boxe-maroc", "/guides/choisir-equipement-boxe-debutant-maroc", "choisir son équipement de boxe pour débuter", "Prix et choix au Maroc"],
  ["amenagement-salle-sport-maroc", "/services/amenagement-salle", "service d’aménagement de salle de sport", null],
  ["barre-traction-maroc", "/produit/livepro-super-band-small", "un élastique en aide", "Progresser quand on ne passe pas une traction"],
];

test("the eight approved links render exactly once inside their relevant editorial paragraphs", async () => {
  for (const [slug, href, anchor, heading] of expected) {
    const entry = articles.find((a) => a.slug === slug);
    const dom = await document(entry);
    const matches = nodes(dom, (n) => n.name === "a" && n.attribs.href === href);
    assert.equal(matches.length, 1, `${slug}: ${href}`);
    const link = matches[0];
    assert.equal(text(link), anchor);
    assert.equal(link.parent.name, "p");
    assert.ok(!parents(link).some((n) => ["nav", "footer"].includes(n.name)));
    if (heading) {
      const section = parents(link).find((n) => n.name === "section");
      assert.equal(text(nodes(section, (n) => n.name === "h2")[0]), heading);
    } else assert.ok(parents(link).some((n) => n.name === "header"));
  }
});

test("all paragraph strings remain readable and annotations cannot silently repeat across paragraphs", async () => {
  for (const entry of articles) {
    const dom = await document(entry);
    const paragraphs = nodes(dom, (n) => n.name === "p").map(text);
    const source = [...entry.intro, ...entry.sections.flatMap((s) => s.paragraphs || [])];
    for (const paragraph of source) {
      assert.equal(typeof paragraph, "string");
      assert.ok(paragraphs.includes(paragraph), entry.slug);
    }
    for (const link of entry.contextualLinks || []) {
      assert.equal(source.reduce((count, p) => count + p.split(link.anchor).length - 1, 0), 1);
      assert.ok(existsSync(path.join(root, `app${link.href}/page.tsx`)) || link.href.startsWith("/produit/") || link.href.startsWith("/blog/"));
    }
    assert.equal(nodes(dom, (n) => n.name === "h1").length, 1);
    assert.ok(nodes(dom, (n) => n.name === "h2").some((n) => text(n) === "À lire aussi"));
  }
});

test("plain text and anchor text are escaped and executable or external link targets are ignored", async () => {
  const paragraph = 'Texte <img src=x onerror=alert(1)> <script>alert(1)</script> guide & suite puis guide & suite. unsafe external';
  const entry = { ...articles[0], intro: [paragraph], contextualLinks: [
    { anchor: "guide & suite", href: "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc" },
    { anchor: "unsafe", href: "javascript:alert(1)" },
    { anchor: "external", href: "//example.com" },
  ] };
  const page = loader(entry)("app/blog/[slug]/page.tsx");
  const dom = await document(entry, page);
  const p = nodes(dom, (n) => n.name === "p").find((n) => text(n) === paragraph);
  assert.ok(p);
  assert.equal(nodes(p, (n) => ["img", "script"].includes(n.name)).length, 0);
  assert.equal(nodes(p, (n) => n.name === "a").length, 1);
  assert.equal(text(nodes(p, (n) => n.name === "a")[0]), "guide & suite");
});

test("Casablanca keeps one existing link and a descriptive anchor in its original sentence", () => {
  const dom = parseDocument(renderToStaticMarkup(React.createElement(load("app/services/amenagement-salle/page.tsx").default)));
  const links = nodes(dom, (n) => n.name === "a" && n.attribs.href === "/services/amenagement-salle/casablanca");
  assert.equal(links.length, 1);
  assert.equal(text(links[0]), "page consacrée à l’aménagement de salle de sport à Casablanca");
  assert.match(text(links[0].parent), /Pour un projet à Casablanca, consultez la/);
});

test("contextual links add no raw HTML mechanism and leave the existing JSON-LD serializer alone", () => {
  const renderer = readFileSync(path.join(root, "app/blog/[slug]/page.tsx"), "utf8");
  assert.equal((renderer.match(/dangerouslySetInnerHTML/g) || []).length, 1);
  assert.match(renderer, /dangerouslySetInnerHTML=\{\{ __html: JSON.stringify\(structuredData\) \}\}/);
  assert.equal(articles.reduce((count, a) => count + (a.contextualLinks?.length || 0), 0), expected.length);
  assert.equal(articles.filter((a) => a.contextualLinks?.length).length, 7);
});
