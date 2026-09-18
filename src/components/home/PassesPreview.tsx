import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { PassTile } from "@/components/tickets/PassTile";
import { links, passes } from "@/content/site";

export function PassesPreview() {
  return (
    <Section id="passes" title="Passes" lede="One night on the trail. Buy online and skip the line at the gate." className="bg-soot">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {passes.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <PassTile pass={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-20 flex flex-wrap items-center gap-8">
        <Button href={links.tickets} size="lg">
          Buy tickets
        </Button>
        <Button href="/tickets" variant="ghost">
          All dates and details
        </Button>
      </div>
    </Section>
  );
}
