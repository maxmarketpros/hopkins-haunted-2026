import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Blaze } from "@/components/system/Blaze";
import { Button } from "@/components/system/Button";
import { links } from "@/content/site";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { formatPostDate } from "@/lib/dates";
import { blogPostingJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      images: [{ url: post.cover, width: 1344, height: 768, alt: post.coverAlt }],
    },
  };
}

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Body images are local, pre-sized; keep them simple and lazy.
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} loading="lazy" decoding="async" className="my-8 h-auto w-full rounded-[2px]" alt={props.alt ?? ""} />
  ),
};

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i < all.length - 1 ? all[i + 1] : null;

  return (
    <>
      <article>
        <header className="fog-seam pb-10 pt-28 md:pt-36">
          <div className="container-prose">
            <Blaze label="Blog" className="mb-6" />
            <h1 className="display text-display-lg text-bone">{post.title}</h1>
            <p className="label-mono mt-6 flex flex-wrap gap-x-3 gap-y-1 text-bone/60">
              <span>By {post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              {post.updated && post.updated !== post.date && (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {formatPostDate(post.updated)}</span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </p>
          </div>
        </header>

        <div className="container-page">
          <figure className="vignette mx-auto max-w-5xl overflow-hidden rounded-[2px] bg-soot">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              width={1344}
              height={768}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              placeholder={blurMap[post.cover] ? "blur" : "empty"}
              blurDataURL={blurMap[post.cover]}
              className="h-auto w-full"
            />
          </figure>
        </div>

        <div className="container-prose prose-night py-14 text-bone/85 md:py-20">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <footer className="container-prose border-t border-bone/10 pt-10">
          <div className="surface flex flex-col gap-4 rounded-[2px] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label-mono text-lantern">The trail is open {" "}Oct 16 – Nov 1</p>
              <p className="mt-2 text-bone/75">Nine nights. Four passes. One way through.</p>
            </div>
            <Button href={links.tickets}>Purchase tickets</Button>
          </div>
          <nav aria-label="More posts" className="mt-10 grid gap-3 sm:grid-cols-2">
            {older && (
              <Link href={`/blog/${older.slug}/`} className="group rounded-[2px] border border-bone/10 p-5 hover:border-lantern/40">
                <span className="label-mono text-bone/60">Older</span>
                <span className="mt-2 block font-bold text-bone group-hover:text-lantern">{older.title}</span>
              </Link>
            )}
            {newer && (
              <Link href={`/blog/${newer.slug}/`} className="group rounded-[2px] border border-bone/10 p-5 hover:border-lantern/40 sm:text-right">
                <span className="label-mono text-bone/60">Newer</span>
                <span className="mt-2 block font-bold text-bone group-hover:text-lantern">{newer.title}</span>
              </Link>
            )}
          </nav>
          <p className="mt-8 pb-4">
            <Link href="/blog/" className="label-mono text-bone/60 underline decoration-fog underline-offset-4 hover:text-lantern">
              ← All posts
            </Link>
          </p>
        </footer>
      </article>
      <JsonLd
        data={[
          blogPostingJsonLd({ title: post.title, description: post.description, slug: post.slug, date: post.date, updated: post.updated, author: post.author, cover: post.cover }),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog/" },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />
    </>
  );
}

