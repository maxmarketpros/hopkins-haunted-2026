import type { Metadata } from "next";
import Image from "next/image";
import { TrailerFrame } from "@/components/about/TrailerFrame";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { aboutSections, links, site, trailCopy } from "@/content/site";
import { breadcrumbJsonLd, JsonLd, videoJsonLd } from "@/lib/jsonld";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export const metadata: Metadata = {
  title: { absolute: "About the Haunt: a Haunted Farm in Simpsonville, SC" },
  description:
    "Hopkins Haunted Attraction is a haunted trail through the woods of an 1800s farm in Simpsonville, SC. Cinematic sets, live actors, 30 minutes in the dark.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About the Haunt | Hopkins Haunted Attraction", url: "/about/", images: [{ url: "/og/about.jpg", width: 1200, height: 630 }] },
};

const night = [
  { step: "Arrive", time: "7:30 PM", body: "Gates open. Park, grab your pass at the booth or on your phone, and hit the vendors while the line builds." },
  { step: "Enter the woods", time: "30 min", body: "Half an hour on foot through the farm woods. Stay alert. Watch your surroundings." },
  { step: "Make it out", time: "If you can", body: "The last stretch is the worst. It ends at the lights, and how you get there is up to you." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        blaze={`Since ${site.since}`}
        title="The sinister woods of the 1800s"
        image="/images/site/trail-chainsaw.webp"
        imageAlt="A masked scare actor raises a chainsaw in green light beside an old wooden door on the Hopkins Haunted Attraction trail in Simpsonville, SC"
        imagePosition="center 30%"
        size="lg"
        actions={
          <>
            <Button href="#trailer" size="lg">
              Watch the trailer
            </Button>
            <Button href="/tickets" variant="ghost">
              Dates and passes
            </Button>
          </>
        }
      />

      {/* The trail, the owner's words */}
      <Section id="trail">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-display-lg text-bone">{trailCopy.heading}</h2>
            <div className="mt-10 max-w-2xl space-y-6 text-bone/80">
              <p className="text-lede">{trailCopy.paragraphs[0]}</p>
              <p>{trailCopy.paragraphs[1]}</p>
              <p className="display text-display-sm text-bone">{trailCopy.paragraphs[2]}</p>
              <p>{trailCopy.paragraphs[3]}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="overflow-hidden rounded-[2px]">
              <Image
                src="/images/site/cast-poster.webp"
                alt="Five Hopkins Haunted Attraction characters posed at a fence under a full moon"
                width={1086}
                height={1448}
                sizes="(min-width: 1024px) 460px, 90vw"
                placeholder="blur"
                blurDataURL={blurMap["/images/site/cast-poster.webp"]}
                className="h-auto w-full"
              />
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* How the night unfolds: a real sequence, so it is numbered */}
      <Section id="the-night" title="One night, in order" className="bg-soot">
        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {night.map((n, i) => (
            <Reveal key={n.step} as="li" delay={i * 100} className="border-t-2 border-bone/15 pt-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="display text-[3.5rem] leading-none text-blaze">{i + 1}</span>
                <span className="label-mono text-bone/55">{n.time}</span>
              </div>
              <h3 className="display mt-6 text-display-sm text-bone">{n.step}</h3>
              <p className="mt-4 text-bone/70">{n.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-24 max-w-3xl">
          <h3 className="display text-display-md text-bone">
            Want them <span className="text-blaze">closer?</span>
          </h3>
          <p className="mt-6 text-lede text-bone/80">{trailCopy.touchPass}</p>
          <div className="mt-10">
            <Button href={links.tickets} size="lg">
              Get the Touch Pass
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Trailer */}
      <Section id="trailer" className="scroll-mt-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display text-display-lg text-bone">Watch the trailer</h2>
          <p className="mt-6 text-lede text-bone/70">Sound on.</p>
        </Reveal>
        <Reveal className="mx-auto mt-14 max-w-5xl md:mt-20" delay={120}>
          <TrailerFrame />
        </Reveal>
      </Section>

      {/* The farm, the owner's SEO copy, kept in full */}
      <Section id="farm" title="The farm" className="bg-soot">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="display text-display-sm text-bone">{aboutSections.cinematic.heading}</h3>
            <div className="mt-6 space-y-5 text-bone/75">
              {aboutSections.cinematic.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="display mt-14 text-display-sm text-bone">{aboutSections.staple.heading}</h3>
            <p className="mt-6 text-bone/75">{aboutSections.staple.body}</p>
            <h3 className="display mt-14 text-display-sm text-bone">{aboutSections.discover.heading}</h3>
            <p className="mt-6 text-bone/75">{aboutSections.discover.body}</p>
            <h3 className="display mt-14 text-display-sm text-bone">{aboutSections.plan.heading}</h3>
            <div className="mt-6 space-y-5 text-bone/75">
              {aboutSections.plan.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <div className="lg:sticky lg:top-32">
              <figure className="overflow-hidden rounded-[2px]">
                <Image
                  src="/images/site/join-the-haunt-crew.webp"
                  alt="Two Hopkins characters under bare winter trees"
                  width={1800}
                  height={1200}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  placeholder="blur"
                  blurDataURL={blurMap["/images/site/join-the-haunt-crew.webp"]}
                  className="h-auto w-full"
                />
              </figure>
              <p className="display mt-10 text-display-sm text-bone">Pick a night</p>
              <p className="mt-3 text-bone/70">Nine nights, four passes, one trail.</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button href={links.tickets}>Get tickets</Button>
                <Button href="/tickets" variant="ghost">
                  All dates
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={[videoJsonLd(), breadcrumbJsonLd([{ name: "About", path: "/about/" }])]} />
    </>
  );
}
