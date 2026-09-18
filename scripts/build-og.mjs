// Composites 1200×630 Open Graph images per page: darkened hero photo + logo + page title. Also app icons.
// Run: node scripts/build-og.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/og");
await mkdir(OUT, { recursive: true });
const W = 1200, H = 630;

const pages = [
  { name: "default", bg: "raw/generated/trail-night.png", title: "The sinister woods of the 1800s", sub: "Simpsonville, SC · Oct 16 – Nov 1, 2026" },
  { name: "tickets", bg: "raw/generated/ticket-booth.png", title: "Tickets & Dates 2026", sub: "Nine nights · 7:30 PM – Midnight · Passes from $15" },
  { name: "about", bg: "raw/generated/farm-barn-fog.png", title: "About the Haunt", sub: "A 30-minute haunted trail on a historic farm" },
  { name: "characters", bg: "raw/generated/treeline-silhouette.png", title: "Who’s waiting in the woods", sub: "Eight characters · Live actors" },
  { name: "faq", bg: "raw/generated/rocking-chair-porch.png", title: "Frequently asked questions", sub: "Know before you go" },
  { name: "crew", bg: "raw/generated/makeup-backstage.png", title: "Join the Haunt Crew", sub: "Seasonal entertainment jobs in Greenville County" },
  { name: "contact", bg: "raw/generated/farm-lane-headlights.png", title: "Contact & Directions", sub: "3717 Fork Shoals Rd., Simpsonville, SC 29680" },
  { name: "blog", bg: "raw/generated/blaze-on-tree.png", title: "Stories from the woods", sub: "The Hopkins Haunted Attraction blog" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function textSvg(title, sub) {
  // Fonts are whatever the system has; keep it bold and simple.
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a0c0b" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#0a0c0b" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect x="72" y="392" width="14" height="22" fill="#c4261d" transform="rotate(-2 79 403)"/>
    <text x="100" y="410" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="3" fill="#c9a24a">HOPKINS HAUNTED ATTRACTION</text>
    <text x="72" y="482" font-family="Impact, 'Arial Black', Georgia, serif" font-size="58" fill="#ede6d6">${esc(title.toUpperCase())}</text>
    <text x="72" y="540" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#ede6d6" fill-opacity="0.8">${esc(sub)}</text>
  </svg>`);
}

const logo = await sharp("raw/images/brand/logo.png").resize({ width: 300 }).png().toBuffer();

for (const p of pages) {
  const dest = path.join(OUT, `${p.name}.jpg`);
  await sharp(p.bg)
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.9, saturation: 0.9 })
    .composite([
      { input: textSvg(p.title, p.sub), top: 0, left: 0 },
      { input: logo, top: 56, left: 72 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  console.log("og/" + p.name + ".jpg");
}

// app icons from the round handprint mark
const mark = "raw/images/brand/handprint-mark.png";
await sharp(mark).resize(512, 512).png().toFile(path.resolve("src/app/icon.png"));
await sharp(mark).resize(180, 180).png().toFile(path.resolve("src/app/apple-icon.png"));
await sharp(mark).resize(32, 32).png().toFile(path.resolve("public/favicon-32.png"));
console.log("icons written");

// favicon.ico: an ICO container wrapping the 32px PNG (supported by every modern browser)
{
  const png = await sharp(mark).resize(32, 32).png().toBuffer();
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bpp
  header.writeUInt32LE(png.length, 14); // size
  header.writeUInt32LE(22, 18); // offset
  await writeFile(path.resolve("public/favicon.ico"), Buffer.concat([header, png]));
  console.log("favicon.ico written");
}
