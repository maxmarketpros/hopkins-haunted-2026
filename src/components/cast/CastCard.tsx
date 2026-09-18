"use client";

import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/** Full-color portrait, name at the foot. Hover pushes in; the name goes red. */
export function CastCard({ c, priority, onOpen }: { c: Character; priority?: boolean; onOpen?: (slug: string) => void }) {
  const href = `/characters/${c.slug}/`;
  const sizes = "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 76vw";

  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-[2px] bg-soot">
      <Image
        src={c.image}
        alt={`${c.name}, a character on the Hopkins Haunted Attraction trail`}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurMap[c.image]}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-soot via-soot/55 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="display text-[2.25rem] leading-none text-bone transition-colors duration-300 group-hover:text-blaze">{c.name}</h3>
        <p className="label-mono mt-2 text-[0.6875rem] text-bone/55">{c.spottedAt}</p>
      </div>

      {onOpen ? (
        <button
          type="button"
          onClick={() => onOpen(c.slug)}
          className="absolute inset-0 z-10 rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-lantern"
        >
          <span className="sr-only">Open {c.name}</span>
        </button>
      ) : (
        <Link href={href} className="absolute inset-0 z-10 rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-lantern">
          <span className="sr-only">Meet {c.name}</span>
        </Link>
      )}
    </div>
  );
}
