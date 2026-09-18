import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { links } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;
const IMG = "/images/site/cast-poster.webp";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container-page grid items-center gap-14 py-24 md:grid-cols-12 md:py-40">
        <Reveal className="md:col-span-7">
          <h2 className="display text-display-xl text-bone">
            Make it
            <br />
            out <span className="text-blaze">alive.</span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Button href={links.tickets} size="lg">
              Get tickets
            </Button>
            <Button href="/tickets" variant="ghost">
              Dates and passes
            </Button>
          </div>
        </Reveal>
        <Reveal className="md:col-span-5" delay={120}>
          <figure className="mx-auto max-w-sm overflow-hidden rounded-[2px] md:max-w-none">
            <Image
              src={IMG}
              alt="Five Hopkins Haunted Attraction characters posed at a fence under a full moon"
              width={1086}
              height={1448}
              sizes="(min-width: 768px) 460px, 90vw"
              placeholder="blur"
              blurDataURL={blurMap[IMG]}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
