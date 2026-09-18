import { DarkMap } from "@/components/contact/DarkMap";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, links, season } from "@/content/site";

export function FindUs() {
  return (
    <Section id="find-us" blaze="Find us" seam>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="display text-display-lg text-bone">Fork Shoals Road, after dark</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="label-mono text-bone/45">Address</dt>
              <dd className="mt-1.5 text-bone">
                <a href={links.directions} target="_blank" rel="noopener" className="hover:text-lantern">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono text-bone/45">Hours</dt>
              <dd className="mt-1.5 text-bone">
                {season.hoursShort}
                <br />
                <span className="text-bone/60">{season.dateGroups.join(" · ")}</span>
              </dd>
            </div>
            <div>
              <dt className="label-mono text-bone/45">Phone</dt>
              <dd className="mt-1.5">
                <a href={contact.phoneHref} className="text-bone hover:text-lantern">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono text-bone/45">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] text-bone hover:text-lantern">
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={links.directions}>Get directions</Button>
            <Button href="/contact" variant="ghost">
              Contact page
            </Button>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={100}>
          <DarkMap />
        </Reveal>
      </div>
    </Section>
  );
}
