import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { site, trailCopy } from "@/content/site";

/** Program notes: the owner's welcome paragraph, set small and quiet, low on the page. */
export function AboutBlock() {
  return (
    <section id="about" className="border-t border-bone/10 py-24 md:py-36">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="display text-display-md text-bone">About the haunt</h2>
          <p className="label-mono mt-4 text-bone/50">Simpsonville, SC · Since {site.since}</p>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={100}>
          <p className="text-bone/75 md:columns-2 md:gap-10">{trailCopy.welcome}</p>
          <div className="mt-8">
            <Button href="/about" variant="ghost">
              Read about the farm
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
