import { Button } from "@/components/system/Button";
import { hero, links } from "@/content/site";
import { BillingBlock } from "./BillingBlock";
import { HeroVideo } from "./HeroVideo";

/**
 * The one-sheet: full-viewport video, bottom-left billing.
 * The H1 is the site's ranking line and the biggest type on the site. No logo; the nav carries it.
 */
export function Hero() {
  const lines = hero.h1;
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-soot">
      <HeroVideo />

      <div className="container-page relative flex flex-1 flex-col justify-end pb-14 pt-32 md:pb-20 md:pt-40">
        <p className="label-mono hero-rise flex items-center gap-3 text-blaze">
          <span aria-hidden className="blaze-mark" />
          <span>{hero.eyebrow}</span>
        </p>
        <h1 className="display mt-6 text-[clamp(3rem,1.25rem+7.5vw,8.5rem)] leading-[0.9] text-bone md:mt-8">
          {lines.map((line, i) => (
            <span
              key={line}
              className={i === lines.length - 1 ? "hero-rise block text-blaze" : "hero-rise block"}
              style={{ animationDelay: `${120 + i * 110}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-rise mt-8 max-w-xl text-lede text-bone/85" style={{ animationDelay: "520ms" }}>
          {hero.lede}
        </p>
        <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ animationDelay: "620ms" }}>
          <Button href={links.tickets} size="lg">
            Get tickets
          </Button>
          <Button href="#trailer" variant="ghost">
            Watch the trailer
          </Button>
        </div>
      </div>

      <BillingBlock className="hero-rise" style={{ animationDelay: "760ms" }} />
    </section>
  );
}
