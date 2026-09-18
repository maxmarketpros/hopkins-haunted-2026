// Post-export fix-up for Next.js segment prefetch payloads.
// The static export writes `<route>/__next.<segment>/__PAGE__.txt` while the client requests
// `<route>/__next.<segment>.__PAGE__.txt`. Write a flat-named copy next to each so prefetches never 404.
// Runs after `next build` (see package.json "build").
import { readdir, stat, copyFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
let copies = 0;

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith("__next.")) {
        for (const f of await readdir(full)) {
          const src = path.join(full, f);
          if ((await stat(src)).isFile()) {
            const dest = path.join(dir, `${e.name}.${f}`);
            await copyFile(src, dest);
            copies++;
          }
        }
      }
      if (e.name !== "_next") await walk(full);
    }
  }
}

await walk(OUT);
console.log(`postbuild: ${copies} prefetch payload alias${copies === 1 ? "" : "es"} written`);
