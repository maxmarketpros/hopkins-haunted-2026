import Image from "next/image";
import { Button } from "@/components/system/Button";
import { contact, links, site } from "@/content/site";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(92svh,900px)] flex-col justify-end overflow-hidden bg-soot">
      <HeroVideo />

      <div className="container-page relative flex flex-1 flex-col justify-center pb-28 pt-24 md:pb-36 md:pt-28">
        <div className="hero-enter max-w-3xl">
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={1600}
            height={600}
            priority
            sizes="(min-width: 768px) 640px, 88vw"
            className="h-auto w-[min(100%,640px)] drop-shadow-[0_10px_40px_rgb(0_0_0_/_0.6)]"
          />
          <p className="mt-7 max-w-xl text-lede italic text-bone/85">
            {site.tagline}. A 30-minute haunted trail through a historic farm in {contact.address.city}, South Carolina.
            Live actors. No hayride. No way around it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={links.tickets} size="lg">
              Purchase tickets
            </Button>
            <Button href="#trailer" variant="secondary" size="lg">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M2 1.5v9l8-4.5-8-4.5Z" />
              </svg>
              See the trailer
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
