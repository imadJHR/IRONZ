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
      if (name.endsWith("/service-contact-form")) return function ContactForm({ service, endpoint }) {
        return React.createElement("div", { "data-quote-service": service, "data-quote-endpoint": endpoint });
      };
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

for (const { route, service, quoteRoute = route } of [
  { route: "/services", service: null },
  { route: "/services/amenagement-salle", service: "Aménagement de salle de sport" },
  { route: "/services/amenagement-salle/salle-professionnelle", service: "Aménagement Salle Professionnelle" },
  { route: "/services/amenagement-salle/home-gym", service: null },
  { route: "/services/revetement-sol-mur", service: null },
  { route: "/services/amenagement-terrains-sport", service: null },
  { route: "/services/personnalisation-accessoires", service: null },
  { route: "/services/espace-enfance", service: null },
  { route: "/services/amenagement-salle/casablanca", service: "Aménagement de salle de sport Casablanca", quoteRoute: "/services/amenagement-salle" },
  { route: "/services/amenagement-salle/agadir", service: "Aménagement de salle de sport Agadir", quoteRoute: "/services/amenagement-salle" },
]) {
test(`${route}: FAQ schema matches the questions and answers visible to customers`, () => {
  const document = parseDocument(html(route));
  const nodes = DomUtils.findAll(() => true, document.children);
  const schemas = nodes.filter((node) => node.name === "script" && node.attribs.type === "application/ld+json")
    .map((node) => JSON.parse(DomUtils.textContent(node)));
  const faqs = schemas.filter((schema) => schema["@type"] === "FAQPage");
  assert.equal(faqs.length, 1);
  assert.ok(faqs[0].mainEntity.length > 0);
  const normalize = (text) => text.replace(/\s+/g, " ").trim();
  const questions = new Set();
  for (const question of faqs[0].mainEntity) {
    assert.ok(!questions.has(question.name), `Duplicate FAQ: ${question.name}`);
    questions.add(question.name);
    const heading = nodes.find((node) => node.name === "h3" && normalize(DomUtils.textContent(node)).replace(/^\?\s*/, "") === question.name);
    assert.ok(heading, `FAQ question not visible: ${question.name}`);
    const answer = heading.parent.children.find((node) => node.name === "p");
    assert.ok(answer, `FAQ answer missing: ${question.name}`);
    assert.equal(normalize(DomUtils.textContent(answer)), normalize(question.acceptedAnswer.text));
  }
});

test(`${route}: quote links select the registered service and preserve the WhatsApp form handoff`, () => {
  const document = parseDocument(html(route));
  const nodes = DomUtils.findAll(() => true, document.children);
  const quoteLinks = nodes.filter((node) => node.name === "a" && node.attribs.href?.startsWith("/demande-devis"));
  assert.ok(quoteLinks.length > 0);
  const services = load("lib/services.ts").getQuoteServices();
  for (const link of quoteLinks) {
    const url = new URL(link.attribs.href, origin);
    const selected = services.find((service) => service.id === url.searchParams.get("service"));
    assert.equal(url.pathname, "/demande-devis");
    if (route === "/services") {
      assert.equal(url.searchParams.toString(), "", "Hub leaves service choice to the quote form");
    } else {
      assert.equal(selected?.href, quoteRoute);
    }
  }
  const forms = nodes.filter((node) => node.attribs?.["data-quote-service"]);
  assert.equal(forms.length, service ? 1 : 0);
  if (service) {
    assert.equal(forms[0].attribs["data-quote-service"], service);
    assert.equal(forms[0].attribs["data-quote-endpoint"], undefined);
  }
});
}

test("Services hub links to every detail and describes confirmed services without unconfirmed coaching", () => {
  const document = parseDocument(html("/services"));
  const nodes = DomUtils.findAll(() => true, document.children);
  const links = new Set(nodes.filter((node) => node.name === "a").map((node) => node.attribs.href));
  for (const route of routes.filter((route) => route !== "/services")) assert.ok(links.has(route), route);
  const headings = nodes.filter((node) => /^h[123]$/.test(node.name)).map((node) => DomUtils.textContent(node));
  assert.doesNotMatch(headings.join(" "), /coaching|maintenance et réparation/i);
  for (const service of [/installation d’équipements/i, /maintenance des équipements/i, /études de projet fitness/i]) {
    assert.match(headings.join(" "), service);
  }
  const whatsapp = nodes.filter((node) => node.name === "a" && node.attribs.href?.startsWith("https://wa.me/"));
  assert.equal(whatsapp.length, 1);
  assert.equal(whatsapp[0].attribs.href, "https://wa.me/212674114446");
});

test("city registry and published city pages stay consistent and claim no local office", () => {
  const { CITIES } = load("lib/cities.ts");
  const cityRoutes = CITIES.filter((city) => city.hasPage).map(
    (city) => `/services/amenagement-salle/${city.slug}`,
  );
  for (const route of cityRoutes) assert.ok(routes.includes(route), route);
  const national = html("/services/amenagement-salle");
  for (const route of cityRoutes) assert.ok(national.includes(`href="${route}"`), `National page must link ${route}`);
  for (const route of cityRoutes) {
    const schemas = [...html(route).matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const service = schemas.find((schema) => schema["@type"] === "Service");
    assert.equal(service.address, undefined, `${route}: no fabricated address`);
    assert.equal(service.geo, undefined, `${route}: no fabricated geo`);
    assert.equal(service.aggregateRating, undefined, `${route}: no rating`);
    assert.equal(service.offers, undefined, `${route}: no offers`);
    assert.ok(["Casablanca", "Agadir"].includes(service.areaServed.name), `${route}: areaServed`);
  }
});

test("sports field video preserves the asset and player without asserting unverified IRONZ completion", () => {
  const rendered = html("/services/amenagement-terrains-sport");
  const document = parseDocument(rendered);
  const nodes = DomUtils.findAll(() => true, document.children);
  const videos = nodes.filter((node) => node.name === "video");
  assert.equal(videos.length, 1);
  const video = videos[0];
  assert.equal(video.attribs.poster, "/terrain-poster.webp");
  assert.equal(video.attribs.preload, "none");
  for (const attribute of ["controls", "loop", "muted", "playsinline"]) {
    assert.ok(Object.hasOwn(video.attribs, attribute));
  }
  const sources = video.children.filter((node) => node.name === "source");
  assert.equal(sources.length, 1);
  assert.equal(sources[0].attribs.src, "/terrain-optimized.mp4");
  assert.equal(sources[0].attribs.type, "video/mp4");
  assert.ok(video.attribs["aria-label"]);
  assert.doesNotMatch(rendered, /Un de nos chantiers|terrain de sport réalisé par\s*IRONZ/i);
});

test("quote journey carries the city through every published city page and into WhatsApp", () => {
  const agadir = readFileSync(path.join(root, "app/services/amenagement-salle/agadir/page.tsx"), "utf8");
  const casablanca = readFileSync(path.join(root, "app/services/amenagement-salle/casablanca/page.tsx"), "utf8");
  const registry = readFileSync(path.join(root, "lib/cities.ts"), "utf8");
  const devis = readFileSync(path.join(root, "app/demande-devis/page.tsx"), "utf8");

  // Each dedicated city page names its own city in the quote CTA.
  assert.match(agadir, /ville=Agadir/);
  assert.match(casablanca, /ville=Casablanca/);

  // The national page generates city links from the registry instead of hard-coding them.
  assert.match(registry, /demande-devis\?service=amenagement-salle&ville=\$\{encodeURIComponent\(city\.name\)\}/);

  // `ville` is the public parameter (French UI); `city` is accepted as an alias.
  assert.match(devis, /params\.get\("ville"\)\s*\?\?\s*params\.get\("city"\)/);

  // The city value must reach the WhatsApp message so the recipient knows the project location.
  assert.match(devis, /Ville: \$\{formData\.city\}/);
});
