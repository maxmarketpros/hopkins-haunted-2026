import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { PassTile } from "@/components/tickets/PassTile";
import { links, passes, sellsOutLine } from "@/content/site";

export function PassesPreview() {
  return (
    <Section id="passes" title="2026 tickets and passes" lede="One night on the trail. Every pass is per person, except parking." className="bg-soot">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {passes.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <PassTile pass={p} />
          </Reveal>
        ))}
      </div>
      <p className="label-mono mt-16 text-blaze">{sellsOutLine}</p>
      <div className="mt-8 flex flex-wrap items-center gap-8">
        <Button href={links.tickets} size="lg">
          Buy tickets
        </Button>
        <Button href="/tickets" variant="ghost">
          All dates and pass details
        </Button>
      </div>
    </Section>
  );
}
