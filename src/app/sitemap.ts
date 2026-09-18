import type { MetadataRoute } from "next";
import { cast, site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/tickets/`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/characters/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/join-the-crew/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];
  const characters: MetadataRoute.Sitemap = cast.map((c) => ({
    url: `${site.url}/characters/${c.slug}/`,
    lastModified: now,
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
