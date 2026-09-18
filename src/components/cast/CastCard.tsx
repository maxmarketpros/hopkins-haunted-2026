"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import type { Character } from "@/content/site";
import { cn } from "@/lib/cn";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/**
 * Portrait sits in the dark until a flashlight (cursor) sweeps over it. Tap toggles the light on touch devices.
 * Names are always readable; the reveal is pure enhancement.
 */
export function CastCard({ c, priority, onOpen }: { c: Character; priority?: boolean; onOpen?: (slug: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const href = `/characters/${c.slug}/`;
  const sizes = "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 70vw";

  return (
    <div
      ref={ref}
      className={cn("group relative aspect-[3/4] overflow-hidden rounded-[2px] bg-soot [--x:50%] [--y:40%]", lit && "is-lit")}
      onPointerMove={move}
      onPointerLeave={() => setLit(false)}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") setLit((v) => !v);
      }}
    >
      {/* dark base */}
      <Image
        src={c.image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurMap[c.image]}
        className="object-cover brightness-[0.38] saturate-[0.7] transition-[filter] duration-700 group-hover:brightness-[0.5] group-[.is-lit]:brightness-100 group-[.is-lit]:saturate-100"
      />
      {/* flashlight reveal */}
      <Image
        src={c.image}
        alt={`${c.name}, a character on the Hopkins Haunted Attraction trail`}
        fill
        sizes={sizes}
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-[.is-lit]:opacity-0 [mask-image:radial-gradient(circle_150px_at_var(--x)_var(--y),black_35%,transparent_100%)] motion-reduce:[mask-image:none]"
      />
      {/* warm rim of the light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_170px_at_var(--x)_var(--y),rgb(201_162_74_/_0.14),transparent_70%)] motion-reduce:hidden"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-soot via-soot/60 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <p className="label-mono text-[0.625rem] text-bone/60">{c.spottedAt}</p>
          <h3 className="display mt-1 text-[1.5rem] leading-none text-bone">{c.name}</h3>
        </div>
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
