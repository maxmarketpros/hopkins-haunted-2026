import type { Metadata } from "next";
import { CastGrid } from "@/components/cast/CastGrid";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Section } from "@/components/system/Section";
import { cast, links } from "@/content/site";
import { breadcrumbJsonLd, castJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Characters",
  description:
    "Get to know the main characters of Hopkins Haunted Attraction: Tip Toes, Jester, Bobby the Butcher, Ashes, Slasher, Schizo, Jolly and Trouble. Eight live actors waiting in the woods in Simpsonville, SC.",
  alternates: { canonical: "/characters/" },
  openGraph: { title: "Characters | Hopkins Haunted Attraction", url: "/characters/", images: [{ url: "/og/characters.jpg", width: 1200, height: 630 }] },
};

export default function CharactersPage() {
  return (
    <>
      <PageHero
        blaze={`Cast · ${cast.length} of them`}
        title="Who’s waiting in the woods"
        lede="Get to know the main characters. Every one of them is a real person in real makeup, and every one of them has been out there longer than you have. Run a light over them, then open one."
        image="/images/generated/treeline-silhouette.webp"
        imageAlt="A dark tree line across a foggy field under a clouded moon"
        imagePosition="center 55%"
      />

      <Section blaze="Main characters" seam className="pt-14 md:pt-20">
        <CastGrid />
        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-bone/10 pt-8">
          <Button href={links.tickets} size="lg">
            Meet them in person
          </Button>
          <p className="max-w-md text-[0.9375rem] text-bone/60">
            Actors will only touch you if you purchase the Touch Pass. Otherwise, look all you like.
          </p>
        </div>
      </Section>

      <JsonLd data={[castJsonLd(), breadcrumbJsonLd([{ name: "Characters", path: "/characters/" }])]} />
    </>
  );
}
