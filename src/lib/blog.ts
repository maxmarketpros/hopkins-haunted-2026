import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  author: string;
  cover: string;
  coverAlt: string;
  readTime: string;
};

export type Post = PostMeta & { content: string };

const DIR = path.join(process.cwd(), "content", "blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? data.excerpt ?? ""),
    excerpt: String(data.excerpt ?? data.description ?? ""),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? "Hopkins Haunted Attraction"),
    cover: String(data.cover),
    coverAlt: String(data.coverAlt ?? ""),
    readTime: data.readTime ? String(data.readTime) : `${Math.max(1, Math.round(rt.minutes))} min read`,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((s) => getPost(s))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
