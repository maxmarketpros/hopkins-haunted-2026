import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { PassStub } from "@/components/tickets/PassStub";
import { links, passes } from "@/content/site";

export function PassesPreview() {
  return (
    <Section id="passes" blaze="Passes · 4 options" title="Pick your pass" lede="Every pass is one night on the trail. Buy online to skip the ticket line; the booth on site sells them too.">
      <div className="grid gap-4 md:grid-cols-2">
        {passes.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70}>
            <PassStub pass={p} index={i} compact />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button href={links.tickets} size="lg">
          Purchase tickets
        </Button>
        <Button href="/tickets" variant="ghost">
          Dates, hours and the fine print
        </Button>
      </div>
    </Section>
  );
}
