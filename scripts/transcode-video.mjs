// Builds the hero loop (16:9, muted, small) and the trailer (original quality) from raw/video/trailer-720p.mp4.
// Run: node scripts/transcode-video.mjs   (requires ffmpeg on PATH)
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const src = path.resolve("raw/video/trailer-720p.mp4"); // 960x720, 4:3, has audio
const out = path.resolve("public/video");
await mkdir(out, { recursive: true });

// Crop 4:3 → 16:9 around the Wix focal point (x 42.6%, y 44.6%): 960x540 window, y offset 51.
const CROP = "crop=960:540:0:51,scale=1280:720:flags=lanczos";

function ff(args) {
  console.log("ffmpeg", args.join(" "));
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
}

// Hero loop MP4 (H.264, no audio)
ff(["-i", src, "-an", "-vf", CROP, "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", path.join(out, "hero-loop.mp4")]);

// Hero loop WebM (VP9, no audio)
ff(["-i", src, "-an", "-vf", CROP, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1",
  path.join(out, "hero-loop.webm")]);

// Poster frame from the loop at 2s
ff(["-ss", "2", "-i", path.join(out, "hero-loop.mp4"), "-frames:v", "1", "-q:v", "3", path.join(out, "hero-poster.jpg")]);

// Trailer: original quality, remuxed for fast start
ff(["-i", src, "-c", "copy", "-movflags", "+faststart", path.join(out, "trailer.mp4")]);

// Trailer poster (uncropped) at 2s
ff(["-ss", "2", "-i", src, "-frames:v", "1", "-q:v", "3", path.join(out, "trailer-poster.jpg")]);

console.log("done");

// WebP copies of the posters (smaller; used by the pages)
{
  const sharp = (await import("sharp")).default;
  await sharp(path.join(out, "hero-poster.jpg")).webp({ quality: 78 }).toFile(path.join(out, "hero-poster.webp"));
  await sharp(path.join(out, "trailer-poster.jpg")).webp({ quality: 78 }).toFile(path.join(out, "trailer-poster.webp"));
  console.log("posters → webp");
}
