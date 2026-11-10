import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
// Next.js supplies Sharp; this script runs locally, never in a page request.
const sharp = require("sharp");
const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.join(root, "public/black-friday");
const output = path.join(directory, "responsive");
const manifest = {};
await mkdir(output, { recursive: true });

for (const filename of (await readdir(directory)).filter(name => name.startsWith("pack-") && name.endsWith(".webp")).sort()) {
  const source = await readFile(path.join(directory, filename));
  const { width } = await sharp(source).metadata();
  const variants = [];
  for (const targetWidth of [240, 384, 640, 960]) {
    const bytes = await sharp(source).resize(targetWidth).webp({ quality: targetWidth <= 384 ? 55 : 65, effort: 6 }).toBuffer();
    const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 10);
    const name = `${path.parse(filename).name}-${targetWidth}-${hash}.webp`;
    await writeFile(path.join(output, name), bytes);
    variants.push({ src: `/black-friday/responsive/${name}`, width: targetWidth, bytes: bytes.length });
  }
  const placeholder = await sharp(source).resize(20).blur(1).webp({ quality: 30 }).toBuffer();
  const src = `/black-friday/${filename}`;
  manifest[src] = {
    srcSet: [...variants.map(item => `${item.src} ${item.width}w`), `${src} ${width}w`].join(", "),
    placeholder: `data:image/webp;base64,${placeholder.toString("base64")}`,
    variants,
  };
  console.log(filename, variants.map(item => `${item.width}px: ${Math.round(item.bytes / 1024)}KB`).join(", "));
}
await writeFile(path.join(root, "data/black-friday-images.json"), JSON.stringify(manifest, null, 2) + "\n");
