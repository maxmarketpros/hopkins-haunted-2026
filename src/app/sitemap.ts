import type { MetadataRoute } from "next";
import { cast, pageDates, site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const priorities: Record<keyof typeof pageDates, { priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/tickets/": { priority: 0.95, changeFrequency: "weekly" },
  "/about/": { priority: 0.8, changeFrequency: "monthly" },
  "/characters/": { priority: 0.8, changeFrequency: "monthly" },
  "/faq/": { priority: 0.7, changeFrequency: "monthly" },
  "/join-the-crew/": { priority: 0.7, changeFrequency: "monthly" },
  "/contact/": { priority: 0.6, changeFrequency: "yearly" },
  "/blog/": { priority: 0.6, changeFrequency: "weekly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = (Object.keys(pageDates) as (keyof typeof pageDates)[]).map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(pageDates[path]),
    ...priorities[path],
  }));
  const characters: MetadataRoute.Sitemap = cast.map((c) => ({
    url: `${site.url}/characters/${c.slug}/`,
    lastModified: new Date(pageDates["/characters/"]),
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...pages, ...characters, ...posts];
}
