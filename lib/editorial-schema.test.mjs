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
const origin = "https://www.ironz.ma";
function Link({ children, ...props }) { return React.createElement("a", props, children); }
function loader(clock = "2030-01-01T00:00:00Z", invalidArticle) {
  const modules = new Map();
  class EditorialClock extends Date {
    constructor(...args) { super(...(args.length ? args : [clock])); }
    static now() { return new Date(clock).getTime(); }
  }
  function load(filename) {
    const absolute = path.resolve(root, filename);
    if (modules.has(absolute)) return modules.get(absolute);
    const exports = {};
    modules.set(absolute, exports);
    vm.runInNewContext(ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, {
      exports, Date: EditorialClock,
      require(name) {
        if (name === "react" || name === "react/jsx-runtime") return require(name);
        if (name === "next/link") return Link;
        if (name === "next/navigation") return { notFound() { throw new Error("Not found"); } };
        if (name === "./BlogHubClient") return function BlogHubClient() { return null; };
        if (invalidArticle && name === "../../../lib/blog") return {
          getArticleBySlug: () => invalidArticle, getRelatedArticles: () => [], articles: [invalidArticle],
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
function visible(node) {
  if (["script", "style"].includes(node.name)) return "";
  if (node.type === "text") return node.data;
  return (node.children || []).map(visible).join(" ");
}
function parsed(html) {
  const dom = parseDocument(html);
  return {
    text: visible(dom).replace(/\s+/g, " "),
    h1: nodes(dom, (n) => n.name === "h1").map((n) => DomUtils.textContent(n)),
    credits: nodes(dom, (n) => n.name === "a" && n.attribs.rel === "author"),
    times: nodes(dom, (n) => n.name === "time"),
    schemas: nodes(dom, (n) => n.name === "script" && n.attribs.type === "application/ld+json")
      .flatMap((n) => JSON.parse(DomUtils.textContent(n))),
  };
}
const load = loader();
const blog = load("lib/blog/index.ts");
const guideFiles = readdirSync(path.join(root, "app/guides"), { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(path.join(root, "app/guides", e.name, "page.tsx")))
  .map((e) => `app/guides/${e.name}/page.tsx`);
async function documents(loadModule = load) {
  const page = loadModule("app/blog/[slug]/page.tsx");
  const docs = [];
  for (const article of blog.articles) {
    docs.push({ route: `/blog/${article.slug}`, article,
      ...parsed(renderToStaticMarkup(await page.default({ params: Promise.resolve({ slug: article.slug }) }))) });
  }
  for (const file of guideFiles) {
    docs.push({ route: file.replace(/^app/, "").replace(/\/page\.tsx$/, ""),
      ...parsed(renderToStaticMarkup(React.createElement(loadModule(file).default))) });
  }
  return docs;
}

test("all Article entities expose the owner-confirmed organization as author and a matching visible credit", async () => {
  const docs = await documents();
  assert.equal(docs.length, blog.articles.length + guideFiles.length);
  for (const doc of docs) {
    const articles = doc.schemas.filter((s) => s["@type"] === "Article");
    assert.equal(articles.length, 1, doc.route);
    const author = articles[0].author;
    assert.deepEqual(JSON.parse(JSON.stringify(author)), {
      "@type": "Organization", name: "IRONZ", url: `${origin}/a-propos`,
    });
    assert.equal(doc.credits.length, 1);
    assert.equal(DomUtils.textContent(doc.credits[0]), author.name);
    assert.equal(doc.credits[0].attribs.href, author.url);
    assert.match(doc.text, /Par IRONZ/);
    assert.equal(doc.h1.length, 1);
  }
});

test("Article and CollectionPage publishers use the existing actual PNG logo while article images stay separate", async () => {
  const logo = load("lib/og-image.ts");
  const docs = [...await documents(),
    parsed(renderToStaticMarkup(React.createElement(load("app/blog/page.tsx").default))),
    parsed(renderToStaticMarkup(React.createElement(load("app/guides/page.tsx").default))),
  ];
  for (const doc of docs) {
    const publication = doc.schemas.find((s) => ["Article", "CollectionPage"].includes(s["@type"]));
    assert.equal(publication.publisher.name, "IRONZ");
    assert.equal(publication.publisher.logo.url, logo.OG_LOGO_URL);
    assert.notEqual(publication.publisher.logo.url, publication.image);
  }
  const bytes = readFileSync(path.join(root, "public/logo-optimized.png"));
  assert.equal(bytes.subarray(1, 4).toString("ascii"), "PNG");
  assert.ok(bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0);
  for (const file of ["ironz-blog-og.jpg", "og-image.jpg"]) assert.ok(existsSync(path.join(root, "public", file)));
  for (const doc of await documents()) {
    const schema = doc.schemas.find((s) => s["@type"] === "Article");
    assert.equal(schema.image, doc.article ? logo.OG_BLOG_URL : logo.OG_DEFAULT_URL);
  }
});

test("publication values stay source-derived, automatic blog revision dates are absent and guide declarations are preserved", async () => {
  for (const doc of await documents()) {
    const schema = doc.schemas.find((s) => s["@type"] === "Article");
    if (doc.article) {
      assert.equal(schema.datePublished, new Date(doc.article.date).toISOString());
      assert.equal(schema.dateModified, undefined);
    } else {
      assert.equal(schema.datePublished, "2026-09-20");
      assert.equal(schema.dateModified, "2026-10-11");
    }
    assert.equal(doc.times.length, 0);
    assert.doesNotMatch(doc.text, /Publié le|Mis à jour le|Revu le/);
  }
});

test("different build clocks cannot create publication or editorial revision events", async () => {
  const first = await documents(loader("2030-01-01T00:00:00Z"));
  const second = await documents(loader("2040-06-01T12:00:00Z"));
  for (let i = 0; i < first.length; i++) {
    const a = first[i].schemas.find((s) => s["@type"] === "Article");
    const b = second[i].schemas.find((s) => s["@type"] === "Article");
    assert.equal(a.datePublished, b.datePublished);
    assert.equal(a.dateModified, b.dateModified);
  }
});

test("missing source publication date cannot silently fall back to the build date", async () => {
  const invalid = { ...blog.articles[0], date: undefined };
  const page = loader("2030-01-01T00:00:00Z", invalid)("app/blog/[slug]/page.tsx");
  await assert.rejects(page.default({ params: Promise.resolve({ slug: invalid.slug }) }), /Invalid time value/);
});

test("all editorial canonicals and indexing directives remain intact, with coherent headlines, breadcrumbs and FAQ answers", async () => {
  const docs = await documents();
  const articlePage = load("app/blog/[slug]/page.tsx");
  for (const doc of docs) {
    const metadata = doc.article
      ? await articlePage.generateMetadata({ params: Promise.resolve({ slug: doc.article.slug }) })
      : load(`app${doc.route}/page.tsx`).metadata;
    assert.equal(metadata.alternates.canonical, doc.route);
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.robots.follow, true);
    const schema = doc.schemas.find((s) => s["@type"] === "Article");
    assert.equal(schema.headline, doc.h1[0]);
    assert.equal(schema.mainEntityOfPage["@id"], origin + doc.route);
    assert.equal(doc.schemas.find((s) => s["@type"] === "BreadcrumbList").itemListElement.at(-1).item, origin + doc.route);
    for (const question of doc.schemas.find((s) => s["@type"] === "FAQPage").mainEntity) {
      assert.ok(doc.text.includes(question.name));
      assert.ok(doc.text.includes(question.acceptedAnswer.text));
    }
  }
  for (const file of ["app/blog/page.tsx", "app/guides/layout.tsx"]) {
    const seo = load(file).metadata;
    assert.equal(seo.robots.index, true);
    assert.equal(seo.robots.follow, true);
    assert.ok(["/blog", "/guides"].includes(seo.alternates.canonical));
  }
});
