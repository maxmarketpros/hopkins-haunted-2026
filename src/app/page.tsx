import type { Metadata } from "next";
import { CastTeaser } from "@/components/home/CastTeaser";
import { CrewTeaser } from "@/components/home/CrewTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { FindUs } from "@/components/home/FindUs";
import { Glance } from "@/components/home/Glance";
import { Hero } from "@/components/home/Hero";
import { PassesPreview } from "@/components/home/PassesPreview";
import { TrailIntro } from "@/components/home/TrailIntro";
import { TrailerSection } from "@/components/home/TrailerSection";
import { site } from "@/content/site";
import { eventsJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: `${site.name} | Haunted Trail in Simpsonville, SC`,
  description:
    "The most terrifying haunted attraction in Greenville County, SC. A 30-minute walk-through haunted trail on a historic farm in Simpsonville with live actors and cinematic scares. Open October 16 – November 1, 2026, 7:30 PM to midnight.",
  alternates: { canonical: "/" },
  openGraph: { title: `${site.name} | Haunted Trail in Simpsonville, SC`, url: "/" },
};

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Hopkins Haunted Attraction: the most terrifying haunted attraction in Greenville County, SC</h1>
      <Hero />
      <Glance />
      <TrailIntro />
      <PassesPreview />
      <CastTeaser />
      <TrailerSection />
      <CrewTeaser />
      <FindUs />
      <FinalCta />
      <JsonLd data={eventsJsonLd()} />
    </>
  );
}
