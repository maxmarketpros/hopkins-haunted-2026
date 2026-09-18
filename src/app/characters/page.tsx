import type { Metadata } from "next";
import { CastGrid } from "@/components/cast/CastGrid";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Section } from "@/components/system/Section";
import { cast, links } from "@/content/site";
import { breadcrumbJsonLd, castJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "The Characters",
  description:
    "Meet the eight characters of Hopkins Haunted Attraction: Tip Toes, Jester, Bobby the Butcher, Ashes, Slasher, Schizo, Jolly and Trouble. Simpsonville, SC.",
  alternates: { canonical: "/characters/" },
  openGraph: { title: "The Characters | Hopkins Haunted Attraction", url: "/characters/", images: [{ url: "/og/characters.jpg", width: 1200, height: 630 }] },
};

export default function CharactersPage() {
  return (
    <>
      <PageHero
        blaze={`${cast.length} characters`}
        title="The characters"
        lede="Real people, real makeup, and every one of them has been out there longer than you have."
        image="/images/site/cast-poster.webp"
        imageAlt="Five Hopkins Haunted Attraction characters posed at a fence under a full moon"
        imagePosition="center 20%"
        size="lg"
      />

      <Section className="pt-16 md:pt-24">
        <CastGrid />
        <div className="mt-20 flex flex-wrap items-center gap-8">
          <Button href={links.tickets} size="lg">
            Meet them in person
          </Button>
          <p className="max-w-sm text-bone/60">They only touch you with a Touch Pass.</p>
        </div>
      </Section>

      <JsonLd data={[castJsonLd(), breadcrumbJsonLd([{ name: "Characters", path: "/characters/" }])]} />
    </>
  );
}
