// Converts raw/ originals into optimized web assets under public/, and writes a blur-placeholder manifest.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const RAW = path.resolve("raw/images");
const OUT = path.resolve("public");
const blur = {};

async function out(rel) {
  const p = path.join(OUT, rel);
  await mkdir(path.dirname(p), { recursive: true });
  return p;
}

async function blurFor(publicPath, input) {
  const buf = await sharp(input).resize(16, null, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  blur[publicPath] = `data:image/webp;base64,${buf.toString("base64")}`;
}

/** photo → webp at given max width; also records blur placeholder */
async function webp(srcRel, destRel, { width, quality = 82 } = {}) {
  const src = path.join(RAW, srcRel);
  const dest = await out(destRel);
  await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(dest);
  await blurFor("/" + destRel.replace(/\\/g, "/"), src);
  const meta = await sharp(dest).metadata();
  console.log(`${destRel.padEnd(48)} ${meta.width}x${meta.height}`);
}


/** photo from an absolute path → webp */
async function webpAbs(src, destRel, { width, quality = 82 } = {}) {
  const dest = await out(destRel);
  await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(dest);
  await blurFor("/" + destRel.replace(/\\/g, "/"), src);
  const meta = await sharp(dest).metadata();
  console.log(`${destRel.padEnd(48)} ${meta.width}x${meta.height}`);
}

/** transparent graphic → png (lossless alpha) */
async function png(srcRel, destRel, { width } = {}) {
  const src = path.join(RAW, srcRel);
  const dest = await out(destRel);
  await sharp(src).resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9, palette: false }).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`${destRel.padEnd(48)} ${meta.width}x${meta.height}`);
}

// brand
await png("brand/logo.png", "brand/logo.png", { width: 1600 });
await png("brand/logo.png", "brand/logo-small.png", { width: 480 });
await png("brand/handprint-mark.png", "brand/handprint-mark.png", { width: 512 });
await png("brand/tree-wordmark.png", "brand/tree-wordmark.png");

// site
await webp("site/banner-wide.png", "images/site/banner-wide.webp", { width: 1999 });
await webp("site/cast-poster.png", "images/site/cast-poster.webp", { width: 1086 });
await webp("site/join-the-haunt-crew.png", "images/site/join-the-haunt-crew.webp", { width: 1800 });
await webp("site/crew-strip.png", "images/site/crew-strip.webp", { width: 1500 });
await png("site/jolly-octagon.png", "images/site/jolly-octagon.png");

// cast
const cast = await readdir(path.join(RAW, "cast"));
for (const f of cast) {
  const slug = f.replace(/\.[a-z]+$/i, "");
  await webp(`cast/${f}`, `images/cast/${slug}.webp`, { width: 900, quality: 84 });
}

// blog
await webp("blog/simpsonville-1800s-cover.png", "images/blog/simpsonville-1800s-cover.webp", { width: 1344 });
await webp("blog/simpsonville-1800s-body.png", "images/blog/simpsonville-1800s-body.webp", { width: 1344 });
await webp("blog/experience-thrills-cover.png", "images/blog/experience-thrills-cover.webp", { width: 1344 });
await webp("blog/experience-thrills-body.jpg", "images/blog/experience-thrills-body.webp", { width: 1200 });
await webp("blog/chilling-story-cover.png", "images/blog/chilling-story-cover.webp", { width: 1344 });
await webp("blog/chilling-story-body.jpeg", "images/blog/chilling-story-body.webp", { width: 1600 });

// generated images (if present in raw/generated) → public/images/generated
try {
  const gen = await readdir(path.resolve("raw/generated"));
  for (const f of gen) {
    if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
    const slug = f.replace(/\.[a-z]+$/i, "");
    await webpAbs(path.resolve("raw/generated", f), `images/generated/${slug}.webp`, { width: 1920, quality: 80 });
  }
} catch {
  console.log("(no raw/generated yet)");
}

await mkdir(path.resolve("src/content"), { recursive: true });
await writeFile(path.resolve("src/content/blur.json"), JSON.stringify(blur, null, 0));
console.log(`\nblur manifest: ${Object.keys(blur).length} entries`);
