import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import { BLACK_FRIDAY_PACKS } from "./black-friday.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const images = JSON.parse(readFileSync(new URL("../data/black-friday-images.json", import.meta.url), "utf8"));

test("all six packs have small, cache-versioned responsive images and an inline preview", () => {
  assert.equal(Object.keys(images).length, 6);
  const budgets = { 240: 12_000, 384: 22_000, 640: 50_000, 960: 85_000 };
  for (const pack of BLACK_FRIDAY_PACKS) {
    assert(statSync(new URL(`../public${pack.image}`, import.meta.url)).size <= 135_000, pack.image);
    const image = images[pack.image];
    assert(image, pack.image);
    assert.deepEqual(image.variants.map(item => item.width), [240, 384, 640, 960]);
    for (const variant of image.variants) {
      const size = statSync(new URL(`../public${variant.src}`, import.meta.url)).size;
      assert.equal(size, variant.bytes);
      assert(size <= budgets[variant.width], `${variant.src}: ${size} bytes`);
      assert.match(variant.src, /-\d+-[a-f0-9]{10}\.webp$/);
      assert(image.srcSet.includes(`${variant.src} ${variant.width}w`));
    }
    assert(image.srcSet.includes(`${pack.image} 1254w`));
    assert.match(image.placeholder, /^data:image\/webp;base64,/);
    assert(image.placeholder.length < 600);
  }
});

test("server HTML exposes image variants immediately, preserves alt text and prioritizes the hero", () => {
  const component = {};
  const compiled = ts.transpileModule(readFileSync(new URL("../components/black-friday-image.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(compiled, { exports: component, require(name) {
    if (name === "react/jsx-runtime") return require(name);
    if (name === "../data/black-friday-images.json") return images;
    throw new Error(`Unexpected dependency: ${name}`);
  } });
  const pack = BLACK_FRIDAY_PACKS[0];
  const props = { src: pack.image, alt: pack.imageAlt, sizes: "50vw" };
  const lazy = renderToStaticMarkup(React.createElement(component.default, props));
  const hero = renderToStaticMarkup(React.createElement(component.default, { ...props, eager: true, priority: true }));
  assert(lazy.includes('loading="lazy"'));
  assert(hero.includes('loading="eager"'));
  assert(hero.includes('fetchPriority="high"') || hero.includes('fetchpriority="high"'));
  for (const html of [lazy, hero]) {
    assert(html.includes('srcSet="') || html.includes('srcset="'));
    assert(html.includes('width="1254" height="1254"'));
    assert(html.includes(pack.imageAlt.replaceAll("&", "&amp;")));
    assert(html.includes(images[pack.image].placeholder));
    assert(!html.includes("/_next/image"));
  }
});
