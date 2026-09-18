import { DarkMap } from "@/components/contact/DarkMap";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, driveTimes, knowBeforeYouGo, links, season, sellsOutLine } from "@/content/site";

const greenville = driveTimes.find((d) => d.from === "Downtown Greenville");
const tips = [knowBeforeYouGo[0], knowBeforeYouGo[2], knowBeforeYouGo[4], knowBeforeYouGo[6]];

/** Where, when, what to know. The local-search section: real towns, real drive times, the map. */
export function PlanYourNight() {
  return (
    <Section id="plan" title="Plan your night" className="bg-soot">
      <div className="grid gap-12 lg:grid-cols-3">
        <Reveal>
          <h3 className="label-mono text-blaze">Where</h3>
          <p className="display mt-5 text-display-sm text-bone">
            {contact.address.street}
            <br />
            {contact.address.city}, {contact.address.state} {contact.address.zip}
          </p>
          <p className="mt-4 text-bone/80">
            On Fork Shoals Road south of Simpsonville, about {greenville?.minutes} minutes from downtown Greenville. Free parking on the farm.
          </p>
          <dl className="mt-6 grid border-t border-bone/10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
            {driveTimes.map((d) => (
              <div key={d.from} className="flex items-baseline justify-between gap-3 border-b border-bone/10 py-2.5">
                <dt className="text-bone/80">{d.from}</dt>
                <dd className="label-mono whitespace-nowrap text-[0.75rem] text-bone/60">about {d.minutes} min</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Button href={links.directions}>Get directions</Button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h3 className="label-mono text-blaze">When</h3>
          <ul className="mt-5 space-y-1.5">
            {season.dateGroups.map((g) => (
              <li key={g} className="display text-display-sm text-bone">
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-bone/80">{season.hoursLine.replace(" Each Night", " each night")}. Times are Eastern.</p>
          <p className="mt-3 text-bone/80">{sellsOutLine}</p>
          <div className="mt-8">
            <Button href="/tickets" variant="ghost">
              Tickets and 2026 dates
            </Button>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="label-mono text-blaze">Know before you go</h3>
          <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
            {tips.map((t) => (
              <li key={t} className="flex items-start gap-4 py-3.5">
                <span aria-hidden className="blaze-mark mt-2" />
                <span className="text-bone/80">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/tickets/#before-you-buy" variant="ghost">
              Everything to know
            </Button>
          </div>
        </Reveal>
      </div>

      {/* the embedded map is desktop only: phones get the Get directions button, which opens their maps app */}
      <Reveal className="mt-12 hidden md:mt-20 md:block" delay={120}>
        <DarkMap height="h-[480px]" />
      </Reveal>
    </Section>
  );
}
