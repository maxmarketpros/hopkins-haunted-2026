import type { Metadata } from "next";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";

export const metadata: Metadata = { title: "Message sent", robots: { index: false, follow: false } };

export default function ThanksPage() {
  return (
    <PageHero
      blaze="Message sent"
      title="We got it."
      lede="Someone will write back from our inbox, usually within a day during the season. Until then, the woods are waiting."
      image="/images/generated/farm-lane-headlights.webp"
      imagePosition="center 60%"
      size="md"
      actions={
        <>
          <Button href="/tickets">Tickets & dates</Button>
          <Button href="/" variant="secondary">
            Back to the trailhead
          </Button>
        </>
      }
    />
  );
}
