import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { Blaze } from "@/components/system/Blaze";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Simpsonville's haunted history, what to expect on the Hopkins Haunted Attraction trail, tips for your visit, and seasonal jobs in Greenville County.",
  alternates: { canonical: "/blog/" },
  openGraph: { title: "Blog | Hopkins Haunted Attraction", url: "/blog/", images: [{ url: "/og/blog.jpg", width: 1200, height: 630 }] },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <section className="pb-14 pt-40 md:pb-20 md:pt-56">
        <div className="container-page">
          <Blaze label="Blog" className="mb-6" />
          <h1 className="display text-display-xl text-bone">Stories from the woods</h1>
          <p className="mt-7 max-w-2xl text-lede text-bone/75">Haunted history, what to expect on the trail, and how to join the crew.</p>
        </div>
      </section>
      <section className="pb-20 md:pb-28">
        <div className="container-page grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
          {first && <PostCard post={first} featured />}
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog/" }])} />
    </>
  );
}
