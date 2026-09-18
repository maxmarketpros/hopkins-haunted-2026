import Image from "next/image";
import type { Character } from "@/content/site";
import { links } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/** Shared character detail layout used by the overlay and the standalone page. */
export function DossierBody({
  c,
  index,
  total,
  headingTag: H = "h2",
}: {
  c: Character;
  index: number;
  total: number;
  headingTag?: "h1" | "h2";
}) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <figure className="vignette relative aspect-[3/4] overflow-hidden rounded-[2px] bg-soot md:col-span-6 lg:col-span-5">
        <Image
          src={c.image}
          alt={`${c.name}, a character on the Hopkins Haunted Attraction trail`}
          fill
          sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={blurMap[c.image]}
          className="object-cover"
          priority
        />
      </figure>
      <div className="flex flex-col md:col-span-6 lg:col-span-7">
        <p className="label-mono text-bone/60">
          Cast {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <H className="display mt-4 text-display-lg text-bone">{c.name}</H>
        <dl className="mt-6 grid gap-4 border-y border-bone/10 py-5 sm:grid-cols-2">
          <div>
            <dt className="label-mono text-bone/60">Spotted at</dt>
            <dd className="mt-1 font-bold text-bone">{c.spottedAt}</dd>
          </div>
          <div>
            <dt className="label-mono text-bone/60">Threat</dt>
            <dd className="mt-1 font-bold text-bone">Real person. Real makeup. Real close.</dd>
          </div>
        </dl>
        <p className="mt-6 text-lede text-bone/85">{c.descriptor}</p>
        <p className="mt-4 text-bone/60">
          Every character on the trail is a live actor. They will not touch you unless you bought a Touch Pass, and they know
          the woods far better than you do.
        </p>
        <div className="mt-auto pt-8">
          <a
            href={links.tickets}
            target="_blank"
            rel="noopener"
            className="label-mono inline-flex rounded-[2px] bg-blaze px-5 py-3 text-bone lantern-glow hover:bg-blaze-deep"
          >
            Meet them in person
          </a>
        </div>
      </div>
    </div>
  );
}
