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
const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://www.ironz.ma";
function files(directory) {
  return readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`],
  );
}
const pages = files("app/services").filter((file) => file.endsWith("/page.tsx"));
const routes = pages.map((file) => file.replace(/^app/, "").replace(/\/page\.tsx$/, ""));
const modules = new Map();
function Icon() { return React.createElement("svg", { "aria-hidden": true }); }
const icons = new Proxy({}, { get: () => Icon });
function Link({ children, ...props }) { return React.createElement("a", props, children); }
function Image({ src, alt, className }) {
  return React.createElement("img", { src: typeof src === "string" ? src : src.src, alt, className });
}
const motion = new Proxy({}, { get: (_, tag) => {
  function Motion({ children, className, id }) { return React.createElement(tag, { className, id }, children); }
  return Motion;
} });
function load(filename) {
  const absolute = path.resolve(root, filename);
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
      if (name === "next/image") return Image;
      if (name === "lucide-react" || name === "react-icons/io") return icons;
      if (name === "framer-motion") return { motion };
      // Contact forms are excluded: these tests cannot submit or contact anyone.
      if (name.endsWith("/service-contact-form")) return function ContactForm() { return null; };
      if (/\.(png|webp|jpe?g)$/.test(name)) return { src: "/fixture-image.webp" };
      if (name.startsWith(".")) {
        let dependency = path.resolve(path.dirname(absolute), name);
        if (!path.extname(dependency)) dependency += existsSync(`${dependency}.ts`) ? ".ts" : ".tsx";
        return load(path.relative(root, dependency));
      }
      throw Error(`Unexpected import ${name}`);
    },
  });
  return exports;
}
function metadata(route) {
  const segments = route.slice(1).split("/");
  const merged = {};
  for (let i = 1; i <= segments.length; i++) {
    const file = `app/${segments.slice(0, i).join("/")}/layout.tsx`;
    if (existsSync(path.join(root, file))) Object.assign(merged, load(file).metadata || {});
  }
  return Object.assign(merged, load(`app${route}/page.tsx`).metadata || {});
}
function html(route) { return renderToStaticMarkup(React.createElement(load(`app${route}/page.tsx`).default)); }

test("every discovered service route has its own canonical and unique relevant metadata", () => {
  const titles = [];
  const descriptions = [];
  for (const route of routes) {
    const seo = metadata(route);
    assert.equal(new URL(seo.alternates.canonical, origin).href, origin + route);
    assert.notEqual(seo.robots?.index, false);
    assert.notEqual(seo.robots?.follow, false);
    assert.ok(seo.title && seo.description);
    assert.match(seo.title, /IRONZ/);
    assert.match(seo.description, /Maroc|Casablanca/);
    titles.push(seo.title);
    descriptions.push(seo.description);
  }
  assert.equal(new Set(titles).size, routes.length);
  assert.equal(new Set(descriptions).size, routes.length);
});

test("social metadata identifies each service rather than the homepage or a parent service", () => {
  for (const route of routes) {
    const seo = metadata(route);
    assert.equal(seo.openGraph.url, origin + route);
    assert.equal(seo.openGraph.title, seo.title);
    assert.equal(seo.openGraph.description, seo.description);
    assert.equal(seo.twitter.title, seo.title);
    assert.equal(seo.twitter.description, seo.description);
    assert.equal(seo.twitter.card, "summary_large_image");
    assert.ok(seo.openGraph.images.length > 0 && seo.twitter.images.length > 0);
  }
});

test("existing hub title modification and canonical remain intact", () => {
  const seo = metadata("/services");
  assert.equal(seo.title, "Services IRONZ : aménagement salle, home gym et revêtement | IRONZ");
  assert.equal(seo.alternates.canonical, "/services");
  assert.equal(seo.description, "Services IRONZ au Maroc : aménagement de salle, home gym, salle pro, revêtement sportif, espace enfance, personnalisation, terrains.");
});

test("each real service page renders one intended H1 and all service links resolve to existing routes", () => {
  const incoming = new Set();
  for (const route of routes) {
    const rendered = html(route);
    assert.equal((rendered.match(/<h1\b/g) || []).length, 1, route);
    for (const match of rendered.matchAll(/<a\b[^>]*href="([^\"]+)"/g)) {
      const target = new URL(match[1].replaceAll("&amp;", "&"), origin);
      if (target.origin !== origin || !target.pathname.startsWith("/services")) continue;
      assert.ok(routes.includes(target.pathname), `${route} links to unknown service ${target.pathname}`);
      if (target.pathname !== route) incoming.add(target.pathname);
    }
  }
  for (const route of routes) assert.ok(incoming.has(route), `No incoming service link for ${route}`);
});

test("Espace enfance is a distinct discoverable service with consistent canonical and schema", () => {
  const route = "/services/espace-enfance";
  const seo = metadata(route);
  const rendered = html(route);
  assert.notEqual(seo.title, metadata("/services").title);
  assert.match(rendered, /motricité/);
  assert.equal(seo.alternates.canonical, route);
  assert.equal(seo.robots.index, true);
  assert.match(html("/services"), /href="\/services\/espace-enfance"/);
  const schemas = [...rendered.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.equal(schemas.find((s) => s["@type"] === "Service").url, origin + route);
  assert.equal(schemas.find((s) => s["@type"] === "BreadcrumbList").itemListElement.at(-1).item, origin + route);
});

test("service and breadcrumb schemas reference the corresponding page without fabricated prices or ratings", () => {
  for (const route of routes.filter((r) => r !== "/services")) {
    const schemas = [...html(route).matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const service = schemas.find((s) => s["@type"] === "Service");
    assert.equal(service.url, origin + route);
    assert.equal(service.aggregateRating, undefined);
    assert.equal(service.offers, undefined);
    assert.equal(schemas.find((s) => s["@type"] === "BreadcrumbList").itemListElement.at(-1).item, origin + route);
  }
});
