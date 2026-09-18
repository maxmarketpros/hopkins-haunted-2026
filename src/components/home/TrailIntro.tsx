import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { trailCopy } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;
const facts = [
  { k: "About 30 min", v: "on foot, in the dark" },
  { k: "Live actors", v: "and they know the woods" },
  { k: "1800s farm", v: "the real thing, not a set" },
];

export function TrailIntro() {
  return (
    <Section id="trail" blaze="Trail · About 30 min" seam className="pb-0 md:pb-0">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 className="display text-display-lg text-bone">{trailCopy.heading}</h2>
          <div className="mt-8 max-w-xl space-y-5 text-bone/85">
            <p className="text-lede">{trailCopy.paragraphs[0]}</p>
            <p>{trailCopy.paragraphs[1]}</p>
            <p className="font-bold text-bone">{trailCopy.paragraphs[2]}</p>
            <p>{trailCopy.paragraphs[3]}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/about" variant="secondary">
              About the haunt
            </Button>
            <Button href="/tickets" variant="ghost">
              Tickets & dates
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={120}>
          <figure className="vignette overflow-hidden rounded-[2px]">
            <Image
              src="/images/generated/trail-night.webp"
              alt="A lantern on a post lights a narrow dirt trail into fog-filled pine woods at night"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              blurDataURL={blurMap["/images/generated/trail-night.webp"]}
              className="h-auto w-full"
            />
          </figure>
          <ul className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[2px] bg-bone/10">
            {facts.map((f) => (
              <li key={f.k} className="bg-bark px-4 py-5">
                <p className="display text-[1.05rem] leading-tight text-bone sm:text-[1.25rem]">{f.k}</p>
                <p className="label-mono mt-2 text-[0.6875rem] text-bone/60">{f.v}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-16 border-t border-bone/10 pt-10 md:mt-20">
        <div className="grid gap-6 md:grid-cols-12 md:items-start">
          <p className="label-mono text-lantern md:col-span-3">Touch Pass</p>
          <div className="md:col-span-9">
            <p className="max-w-3xl text-lede text-bone/85">{trailCopy.touchPass}</p>
            <p className="mt-4 font-bold text-bone">{trailCopy.closing}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
