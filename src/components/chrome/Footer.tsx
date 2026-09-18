import Image from "next/image";
import Link from "next/link";
import { contact, links, nav, season, site } from "@/content/site";
import { Social } from "./Social";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-bone/10 bg-soot">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Image src="/brand/logo.png" alt={site.name} width={1600} height={600} className="h-auto w-64" />
          <p className="mt-6 max-w-sm text-bone/70">
            A 30-minute walk-through haunted trail on a historic farm in Simpsonville, South Carolina. Live actors, cinematic
            sets, and the sinister woods of the 1800s. Every October since {site.since}.
          </p>
          <div className="mt-6 flex gap-3">
            <Social />
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="label-mono text-lantern">Pages</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-bone/80 hover:text-bone hover:underline decoration-fog underline-offset-4">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-bone/80 hover:text-bone hover:underline decoration-fog underline-offset-4">
                Contact & directions
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label-mono text-lantern">Find us</p>
          <address className="mt-4 not-italic text-bone/80">
            <a href={links.directions} target="_blank" rel="noopener" className="hover:text-bone hover:underline decoration-fog underline-offset-4">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.state} {contact.address.zip}
            </a>
            <br />
            <a href={contact.phoneHref} className="mt-3 inline-block hover:text-bone hover:underline decoration-fog underline-offset-4">
              {contact.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${contact.email}`} className="inline-block [overflow-wrap:anywhere] hover:text-bone hover:underline decoration-fog underline-offset-4">
              {contact.email}
            </a>
          </address>
          <p className="label-mono mt-6 text-bone/60">
            {season.rangeShort} · {season.hoursShort}
          </p>
          <a
            href={links.tickets}
            target="_blank"
            rel="noopener"
            className="label-mono mt-5 inline-flex rounded-[2px] bg-blaze px-5 py-3 text-bone lantern-glow hover:bg-blaze-deep"
          >
            Purchase tickets
          </a>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.8125rem] text-bone/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {season.year} {site.name}. {site.footerLine} All rights reserved.
          </p>
          <p className="label-mono text-[0.6875rem]">
            {contact.address.city}, {contact.address.state} · Greenville County
          </p>
        </div>
      </div>
    </footer>
  );
}
