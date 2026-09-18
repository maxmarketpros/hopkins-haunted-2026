// Downloads every original image and the one video from the old Wix site into raw/ (gitignored).
// Run: node scripts/fetch-assets.mjs
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const MEDIA = "https://static.wixstatic.com/media/";
const VIDEO =
  "https://video.wixstatic.com/video/30eebb_df547e4c42e845c596d57355420dbecb/720p/mp4/file.mp4";

/** [wix id, destination under raw/images] */
const IMAGES = [
  // brand
  ["30eebb_d6dc1dfd28ec47bc936c947a4e0d0eda~mv2.png", "brand/logo.png"],
  ["30eebb_64c9ea943c5d4671b184035518d206fd~mv2.png", "brand/handprint-mark.png"],
  ["30eebb_4cdb1dd95ff14989891d86ebc256ee1f~mv2.png", "brand/tree-wordmark.png"],
  // site graphics / photos
  ["30eebb_296fe717684941f38aa3b176695e97cb~mv2.png", "site/banner-wide.png"],
  ["30eebb_d37e45b67cae439eadca82e16a851fcf~mv2.png", "site/cast-poster.png"],
  ["30eebb_7b97bed78a774ab79d56d84a41c81412~mv2.png", "site/jolly-octagon.png"],
  ["30eebb_1b03264e019c469ab3095a5b18e3bc65~mv2.png", "site/join-the-haunt-crew.png"],
  ["30eebb_afbf2cc9f2584a6891b35263e6dd9c9a~mv2.png", "site/crew-strip.png"],
  ["30eebb_95e885c735b04f999b5cbaef2c7502e0~mv2.png", "site/tryouts-flyer.png"],
  ["30eebb_6d350fe79efc4413996a49c9855578de~mv2.png", "site/banner-vendor.png"],
  ["30eebb_abd6768a42204f059b1bd37a03c8cf07~mv2.png", "site/banner-small.png"],
  ["30eebb_df547e4c42e845c596d57355420dbecbf000.jpg", "site/video-poster-wix.jpg"],
  // cast
  ["30eebb_b724fbcbb9734eb9a2545e2192bdf32b~mv2.png", "cast/tip-toes.png"],
  ["30eebb_3a699f76f8b1497a8b641c9d391551f4~mv2.png", "cast/jester.png"],
  ["30eebb_be680008b6a144ff84efd831da48f614~mv2.png", "cast/bobby-the-butcher.png"],
  ["30eebb_c0ec9a230d934105a69a3f505ee5c3f3~mv2.png", "cast/ashes.png"],
  ["30eebb_f9e1cf2e1c7d443c9b8c1a6cee186057~mv2.png", "cast/slasher.png"],
  ["30eebb_d09b2c42195b4f8da7461a1a845d4eab~mv2.png", "cast/schizo.png"],
  ["30eebb_ec760ea783cb47f6a6ff46e7fc93b113~mv2.png", "cast/jolly.png"],
  ["30eebb_7526c5b8c4384734b958d4e93fe8c788~mv2.png", "cast/trouble.png"],
  // blog
  ["30eebb_536d0efeef9b40c9a9c306818a473be2~mv2.png", "blog/simpsonville-1800s-cover.png"],
  ["30eebb_1c41330b96c9479b90f6a4641f0c76f3~mv2.png", "blog/simpsonville-1800s-body.png"],
  ["30eebb_39f1e9a961014a38990730bd22e15007~mv2.png", "blog/experience-thrills-cover.png"],
  ["30eebb_f5ae1ba04908460fb9f29d938f8fcc05~mv2.jpg", "blog/experience-thrills-body.jpg"],
  ["30eebb_c850d0e5dee34d16b7a1cb399d5a3375~mv2.png", "blog/chilling-story-cover.png"],
  ["30eebb_e2ccbd00af864a93a4fecfafd7c9ec77~mv2.jpeg", "blog/chilling-story-body.jpeg"],
];

const root = path.resolve("raw");

async function exists(p) {
  try {
    const s = await stat(p);
    return s.size > 0;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  if (await exists(dest)) return "skip";
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return `${(buf.length / 1024).toFixed(0)} KB`;
}

for (const [id, rel] of IMAGES) {
  const dest = path.join(root, "images", rel);
  const r = await download(MEDIA + id, dest);
  console.log(`${rel.padEnd(40)} ${r}`);
}
const v = await download(VIDEO, path.join(root, "video", "trailer-720p.mp4"));
console.log(`${"video/trailer-720p.mp4".padEnd(40)} ${v}`);
