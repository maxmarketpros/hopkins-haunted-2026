import { site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${site.url}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>${esc(p.author)}</author>
      <description>${esc(p.excerpt)}</description>
      <enclosure url="${site.url}${p.cover}" type="image/webp" />
    </item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Blog</title>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(site.description)}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
