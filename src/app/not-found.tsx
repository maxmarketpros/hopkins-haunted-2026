import type { Metadata } from "next";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";

export const metadata: Metadata = { title: "Off the trail", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      blaze="404 · Off the trail"
      title="You wandered off the trail."
      lede="That page isn’t out here. Head back to the trailhead before something finds you first."
      image="/images/generated/blaze-on-tree.webp"
      size="lg"
      actions={
        <>
          <Button href="/">Back to the trailhead</Button>
          <Button href="/tickets" variant="secondary">
            Tickets & dates
          </Button>
        </>
      }
    />
  );
}
