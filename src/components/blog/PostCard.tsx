import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/dates";
import { cn } from "@/lib/cn";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export function PostCard({ post, featured }: { post: PostMeta; featured?: boolean }) {
  return (
    <article className={cn("group", featured && "md:col-span-2")}>
      <Link href={`/blog/${post.slug}/`} className="block">
        <figure className={cn("vignette overflow-hidden rounded-[2px] bg-soot", featured ? "aspect-[21/9]" : "aspect-[16/9]")}>
          <Image
            src={post.cover}
            alt={post.coverAlt}
            width={1344}
            height={768}
            sizes={featured ? "(min-width: 1024px) 1104px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            placeholder={blurMap[post.cover] ? "blur" : "empty"}
            blurDataURL={blurMap[post.cover]}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </figure>
        <div className="mt-5">
          <p className="label-mono flex flex-wrap gap-x-3 text-bone/45">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </p>
          <h2 className={cn("display mt-3 text-bone group-hover:text-lantern", featured ? "text-display-md" : "text-[1.375rem] leading-tight")}>{post.title}</h2>
          <p className="mt-3 max-w-2xl text-bone/70">{post.excerpt}</p>
          <p className="mt-4 text-[0.875rem] text-bone/50">By {post.author}</p>
        </div>
      </Link>
    </article>
  );
}
