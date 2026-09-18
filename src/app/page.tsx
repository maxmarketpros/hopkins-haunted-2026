import type { Metadata } from "next";
import { AboutBlock } from "@/components/home/AboutBlock";
import { CastTeaser } from "@/components/home/CastTeaser";
import { CrewTeaser } from "@/components/home/CrewTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PassesPreview } from "@/components/home/PassesPreview";
import { PlanYourNight } from "@/components/home/PlanYourNight";
import { TrailIntro } from "@/components/home/TrailIntro";
import { TrailerSection } from "@/components/home/TrailerSection";
import { site } from "@/content/site";
import { eventsJsonLd, JsonLd, videoJsonLd } from "@/lib/jsonld";

const title = `Haunted Trail Near Greenville, SC | ${site.name}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description:
    "A 30-minute haunted trail on an 1800s farm in Simpsonville, SC, about 30 minutes from Greenville. Live actors, nine nights, Oct 16 – Nov 1, 2026. From $15.",
  alternates: { canonical: "/" },
  openGraph: { title, url: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrailIntro />
      <PassesPreview />
      <CastTeaser />
      <TrailerSection />
      <CrewTeaser />
      <PlanYourNight />
      <HomeFaq />
      <AboutBlock />
      <FinalCta />
      <JsonLd data={[...eventsJsonLd(), videoJsonLd()]} />
    </>
  );
}
