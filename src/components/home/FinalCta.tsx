import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { links, trailCopy } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-bone/10">
      <div className="container-page grid items-center gap-10 py-20 md:grid-cols-12 md:py-24">
        <Reveal className="md:col-span-7">
          <p className="label-mono text-lantern">One last thing</p>
          <h2 className="display mt-5 text-display-xl text-bone">Do you have what it takes to make it out alive?</h2>
          <p className="mt-6 max-w-xl text-bone/80">{trailCopy.welcome}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={links.tickets} size="lg">
              Purchase tickets
            </Button>
            <Button href="/tickets" variant="secondary" size="lg">
              Dates & passes
            </Button>
          </div>
        </Reveal>
        <Reveal className="md:col-span-5" delay={120}>
          <figure className="vignette mx-auto max-w-sm overflow-hidden rounded-[2px] md:max-w-none">
            <Image
              src="/images/site/cast-poster.webp"
              alt="Five Hopkins Haunted Attraction characters posed at a fence under a full moon"
              width={1086}
              height={1448}
              sizes="(min-width: 768px) 420px, 90vw"
              placeholder="blur"
              blurDataURL={blurMap["/images/site/cast-poster.webp"]}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
