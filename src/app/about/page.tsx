import type { Metadata } from "next";
import Image from "next/image";
import { TrailerFrame } from "@/components/about/TrailerFrame";
import { Blaze } from "@/components/system/Blaze";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { aboutSections, links, site, trailCopy } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export const metadata: Metadata = {
  title: "About the Haunt",
  description:
    "Hopkins Haunted Attraction is a fully immersive haunted trail through the sinister woods of an 1800s farm in Simpsonville, SC. Cinematic sets, live actors, about 30 minutes in the dark. Watch the trailer.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About the Haunt | Hopkins Haunted Attraction", url: "/about/", images: [{ url: "/og/about.jpg", width: 1200, height: 630 }] },
};

const night = [
  {
    step: "Arrive",
    time: "7:30 PM",
    body: "Gates open. Park (VIP parking gets you closer to the entrance), pick up your pass at the booth or skip the line with the one on your phone, and hit the food and drink vendors while the line builds.",
  },
  {
    step: "Enter the woods",
    time: "About 30 min",
    body: "Your group steps onto the trail. Half an hour on foot through the 1800s farm woods: haunted trails, terrifying scenes, and unexpected encounters lurking deep within the darkness. Stay alert. Watch your surroundings.",
  },
  {
    step: "Make it out",
    time: "If you can",
    body: "The last stretch is the worst. With a Touch Pass, the creatures get a little closer. Either way it ends at the lights, and whether you scream, laugh or run is entirely up to you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        blaze={`About · Since ${site.since}`}
        title="The sinister woods of the 1800s"
        lede={trailCopy.paragraphs[0]}
        image="/images/generated/farm-barn-fog.webp"
        imageAlt="A weathered wooden barn at night with fog across the field and one window lit"
        imagePosition="center 60%"
        size="lg"
        actions={
          <>
            <Button href="#trailer" size="lg">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M2 1.5v9l8-4.5-8-4.5Z" />
              </svg>
              Watch the trailer
            </Button>
            <Button href="/tickets" variant="secondary" size="lg">
              Tickets & dates
            </Button>
          </>
        }
      />

      {/* The trail, verbatim */}
      <Section id="trail" blaze="The trail" seam>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-display-lg text-bone">{trailCopy.heading}</h2>
            <div className="mt-8 max-w-2xl space-y-5 text-bone/85">
              <p>{trailCopy.paragraphs[1]}</p>
              <p className="text-lede font-bold text-bone">{trailCopy.paragraphs[2]}</p>
              <p>{trailCopy.paragraphs[3]}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="vignette overflow-hidden rounded-[2px]">
              <Image
                src="/images/site/cast-poster.webp"
                alt="Five Hopkins Haunted Attraction characters posed at a fence under a full moon"
                width={1086}
                height={1448}
                sizes="(min-width: 1024px) 420px, 90vw"
                placeholder="blur"
                blurDataURL={blurMap["/images/site/cast-poster.webp"]}
                className="h-auto w-full"
              />
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* How the night unfolds: a real sequence, so it is numbered */}
      <Section id="the-night" blaze="How the night unfolds" title="One night, in order">
        <ol className="grid gap-px overflow-hidden rounded-[2px] bg-bone/10 md:grid-cols-3">
          {night.map((n, i) => (
            <Reveal key={n.step} as="li" delay={i * 100} className="bg-bark p-7 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="display text-[2.5rem] leading-none text-lantern">{String(i + 1).padStart(2, "0")}</span>
                <span className="label-mono text-bone/45">{n.time}</span>
              </div>
              <h3 className="display mt-6 text-display-sm text-bone">{n.step}</h3>
              <p className="mt-4 text-bone/80">{n.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-10 grid gap-6 border-t border-bone/10 pt-8 md:grid-cols-12">
          <p className="label-mono text-lantern md:col-span-3">Touch Pass</p>
          <div className="md:col-span-9">
            <p className="max-w-3xl text-lede text-bone/85">{trailCopy.touchPass}</p>
            <p className="mt-4 font-bold text-bone">{trailCopy.closing}</p>
            <div className="mt-6">
              <Button href={links.tickets}>Purchase tickets</Button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Trailer */}
      <Section id="trailer" blaze="Trailer · Sound on" seam className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-display-lg text-bone">See it before you walk it</h2>
            <p className="mt-6 text-bone/80">Thirty seconds from the woods. Everything in it is real, on the farm, after dark. Turn the sound up.</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <TrailerFrame />
          </Reveal>
        </div>
      </Section>

      {/* The farm, verbatim from the old About page */}
      <section id="farm" className="relative isolate overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 vignette">
          <Image
            src="/images/generated/farm-barn-fog.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine via-pine/70 to-pine" />
        </div>
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <Blaze label="The farm" className="mb-6" />
            <h2 className="display text-display-lg text-bone">{aboutSections.cinematic.heading}</h2>
            <div className="mt-8 space-y-5 text-bone/85">
              {aboutSections.cinematic.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <Reveal>
              <h3 className="display text-display-sm text-bone">{aboutSections.staple.heading}</h3>
              <p className="mt-4 text-bone/80">{aboutSections.staple.body}</p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="display text-display-sm text-bone">{aboutSections.discover.heading}</h3>
              <p className="mt-4 text-bone/80">{aboutSections.discover.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Plan your night */}
      <Section id="plan" blaze="Plan your night" title={aboutSections.plan.heading} seam>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 text-bone/85 lg:col-span-8">
            {aboutSections.plan.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="lg:col-span-4" delay={100}>
            <div className="surface rounded-[2px] p-6">
              <p className="label-mono text-lantern">Next step</p>
              <p className="display mt-3 text-display-sm text-bone">Pick a night</p>
              <p className="mt-3 text-bone/75">Nine nights, four passes, one trail.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={links.tickets}>Purchase tickets</Button>
                <Button href="/tickets" variant="secondary">
                  Dates & passes
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about/" }])} />
    </>
  );
}
