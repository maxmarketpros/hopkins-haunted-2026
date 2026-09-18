// Migrates the four Wix blog posts into content/blog/*.mdx, verbatim.
// Wix embeds each post as schema.org BlogPosting JSON-LD whose articleBody is Markdown.
// Run: node scripts/extract-blog.mjs   (fetches the live pages; falls back to raw/posts/<slug>.html if present)
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "node-html-parser";

const SITE = "https://www.hopkinshauntedattraction.com/post/";

const POSTS = [
  {
    slug: "discover-simpsonville-s-1800s-haunted-adventure",
    cover: "/images/blog/simpsonville-1800s-cover.webp",
    coverAlt: "An old white farmhouse among bare trees in fog",
    body: "/images/blog/simpsonville-1800s-body.webp",
    bodyAlt: "A weathered wooden frame with iron rings standing in a foggy field",
    excerpt: "Simpsonville’s past is full of ghost stories. Here are the cemetery, the depot and the old mill that locals still whisper about.",
  },
  {
    slug: "experience-the-thrills-of-hopkins-haunted-attraction",
    cover: "/images/blog/experience-thrills-cover.webp",
    coverAlt: "A dim teal-lit corridor ending at a single door",
    body: "/images/blog/experience-thrills-body.webp",
    bodyAlt: "A rusted iron fence with chains in a foggy wood",
    excerpt: "What to expect on the trail, from the live actors to the sounds in the dark, and three tips that make the night better.",
  },
  {
    slug: "join-the-chilling-story-at-hopkins-haunted-attraction",
    cover: "/images/blog/chilling-story-cover.webp",
    coverAlt: "A hallway lit by a red sign reading Haunted Attraction",
    body: "/images/blog/chilling-story-body.webp",
    bodyAlt: "A figure in green light lying beneath a wooden ceiling",
    excerpt: "Hopkins is a story you walk through. How to plan ahead, who to bring, and why it has become a tradition.",
  },
  {
    slug: "exciting-seasonal-entertainment-jobs-in-greenville-county-for-theatrical-students-and-enthusiastic-a",
    cover: "/images/cast/bobby-the-butcher.webp",
    coverAlt: "Bobby the Butcher, a masked character in an apron, standing by an outdoor cabinet",
    body: null,
    bodyAlt: "",
    excerpt: "Entertainer and concessions roles, who they suit, what they pay back in experience, and how to apply.",
  },
];

async function loadHtml(slug) {
  const local = path.resolve("raw/posts", `${slug}.html`);
  try {
    return await readFile(local, "utf8");
  } catch {
    const res = await fetch(SITE + slug, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`${res.status} for ${slug}`);
    const html = await res.text();
    await mkdir(path.dirname(local), { recursive: true });
    await writeFile(local, html);
    return html;
  }
}

/** Fallback for posts whose JSON-LD lacks a body: convert the rendered Wix article into Markdown. */
function domToMarkdown(root) {
  const art = root.querySelector('article[data-hook="post"]');
  if (!art) return "";
  const decode = (s) =>
    s
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&#x27;/g, "'");
  const inline = (el) => {
    let out = "";
    for (const n of el.childNodes) {
      if (n.nodeType === 3) {
        out += n.rawText.replace(/\s+/g, " ");
        continue;
      }
      const tag = (n.tagName || "").toLowerCase();
      if (tag === "br") {
        out += "\n";
        continue;
      }
      const inner = inline(n);
      if (!inner.trim()) {
        out += inner;
        continue;
      }
      const style = (n.getAttribute && n.getAttribute("style")) || "";
      if (tag === "strong" || tag === "b" || /font-weight:\s*(bold|[6-9]00)/.test(style)) out += `**${inner.trim()}**`;
      else if (tag === "em" || tag === "i") out += `*${inner.trim()}*`;
      else if (tag === "a" && n.getAttribute("href")) out += `[${inner.trim()}](${n.getAttribute("href")})`;
      else out += inner;
    }
    return out;
  };
  const parts = [];
  for (const el of art.querySelectorAll("h2, h3, h4, p, ul, ol, blockquote")) {
    let parent = el.parentNode;
    let skip = false;
    while (parent && parent !== art) {
      const t = (parent.tagName || "").toLowerCase();
      if (["li", "blockquote", "ul", "ol"].includes(t)) skip = true;
      const hook = parent.getAttribute && parent.getAttribute("data-hook");
      if (hook && /post-footer|post-stats|recent-posts|post-title|share|user-name/.test(hook)) skip = true;
      parent = parent.parentNode;
    }
    if (skip) continue;
    const tag = el.tagName.toLowerCase();
    if (tag === "ul" || tag === "ol") {
      const items = el
        .querySelectorAll("li")
        .map((li) => decode(inline(li)).trim())
        .filter(Boolean)
        .map((t, i) => `${tag === "ol" ? `${i + 1}.` : "-"} ${t}`);
      if (items.length) parts.push(items.join("\n"));
      continue;
    }
    const text = decode(inline(el)).trim();
    if (!text) continue;
    // the owner pasted raw markdown image placeholders pointing at example.com; they never rendered, so drop them
    if (/^!\[[^\]]*\]\(https?:\/\/example\.com[^)]*\)$/.test(text)) continue;
    if (tag === "h2") parts.push(`## ${text}`);
    else if (tag === "h3") parts.push(`### ${text}`);
    else if (tag === "h4") parts.push(`#### ${text}`);
    else if (tag === "blockquote") parts.push(`> ${text}`);
    else parts.push(text);
  }
  return parts.join("\n\n");
}

/** Escape the few characters MDX treats as syntax inside plain Markdown text. */
function mdxSafe(md) {
  return md
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/<(?=[A-Za-z/!])/g, "&lt;");
}

function yamlStr(s) {
  return JSON.stringify(s);
}

await mkdir(path.resolve("content/blog"), { recursive: true });

for (const p of POSTS) {
  const html = await loadHtml(p.slug);
  const root = parse(html);
  const ld = root
    .querySelectorAll('script[type="application/ld+json"]')
    .map((s) => {
      try {
        return JSON.parse(s.text);
      } catch {
        return null;
      }
    })
    .flatMap((j) => (Array.isArray(j) ? j : [j]))
    .filter(Boolean);
  const posting = ld.find((j) => j["@type"] === "BlogPosting");
  const article = ld.find((j) => typeof j.articleBody === "string" && j.articleBody.length > 600) ?? null;
  if (!posting) throw new Error(`missing BlogPosting JSON-LD for ${p.slug}`);

  const title = posting.headline ?? article?.headline;
  const description = root.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  const readTime = root.querySelector('[data-hook="time-to-read"]')?.text?.trim() ?? "";
  const author = posting.author?.name ?? "Hopkins Haunted Attraction";
  const date = (posting.datePublished ?? "").slice(0, 10);
  const updated = (posting.dateModified ?? "").slice(0, 10);

  let body = article ? String(article.articleBody ?? "").replace(/\r\n/g, "\n").trim() : domToMarkdown(root);
  if (!body) throw new Error(`no body found for ${p.slug}`);
  // drop the repeated title line
  if (body.startsWith(title)) body = body.slice(title.length).trim();
  // insert the body image before the first H2 (after the intro)
  if (p.body) {
    const idx = body.indexOf("\n## ");
    const fig = `\n\n![${p.bodyAlt}](${p.body})\n`;
    body = idx > 0 ? body.slice(0, idx) + fig + body.slice(idx) : body + fig;
  }
  body = mdxSafe(body);

  const fm = [
    "---",
    `title: ${yamlStr(title)}`,
    `description: ${yamlStr(description)}`,
    `excerpt: ${yamlStr(p.excerpt)}`,
    `date: ${yamlStr(date)}`,
    updated && updated !== date ? `updated: ${yamlStr(updated)}` : null,
    `author: ${yamlStr(author)}`,
    `readTime: ${yamlStr(readTime)}`,
    `cover: ${yamlStr(p.cover)}`,
    `coverAlt: ${yamlStr(p.coverAlt)}`,
    `source: ${yamlStr(SITE + p.slug)}`,
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  const dest = path.resolve("content/blog", `${p.slug}.mdx`);
  await writeFile(dest, fm + body + "\n");
  console.log(`${p.slug.slice(0, 40).padEnd(42)} ${date}  ${readTime.padEnd(12)} ${body.length} chars`);
}
