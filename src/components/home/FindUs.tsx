import { DarkMap } from "@/components/contact/DarkMap";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { contact, links, season } from "@/content/site";

export function FindUs() {
  return (
    <section id="find-us" className="bg-soot py-24 md:py-40">
      <div className="container-page">
        <Reveal>
          <h2 className="display text-display-lg text-bone">Find us</h2>
        </Reveal>
        <Reveal className="relative mt-14 md:mt-20" delay={120}>
          <DarkMap height="h-[420px] md:h-[560px]" />
          <div className="surface mt-6 max-w-md p-8 md:absolute md:left-8 md:top-8 md:mt-0 md:p-10">
            <p className="display text-display-sm text-bone">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.state} {contact.address.zip}
            </p>
            <p className="mt-5 text-bone/70">
              {season.rangeShort} · {season.hoursShort}
            </p>
            <p className="mt-1 text-bone/70">
              <a href={contact.phoneHref} className="hover:text-bone">
                {contact.phoneDisplay}
              </a>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href={links.directions}>Get directions</Button>
              <Button href="/contact" variant="ghost">
                Contact
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
