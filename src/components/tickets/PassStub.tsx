import { links, type Pass } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * A pass rendered as a ticket stub: body on the left, perforation, price on the stub end.
 * `compact` hides the long-form paragraphs (used on the home page).
 */
export function PassStub({ pass, compact, index }: { pass: Pass; compact?: boolean; index: number }) {
  const serial = `HHA-26-${String(index + 1).padStart(2, "0")}`;
  return (
    <article
      className={cn(
        "surface relative flex overflow-hidden rounded-[2px]",
        pass.featured && "border-lantern/40 shadow-[0_0_0_1px_rgb(201_162_74_/_0.15),0_0_50px_rgb(201_162_74_/_0.12)]",
      )}
    >
      {/* watermark handprint on the touch pass */}
      {pass.slug === "touch-pass" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-[0.07] [mask-image:url(/brand/handprint-mark.png)] [mask-size:contain] [mask-repeat:no-repeat] bg-blaze"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col p-6 md:p-7">
        <p className="label-mono text-lantern">{pass.kicker}</p>
        <h3 className="display mt-2 text-display-sm text-bone">{pass.name}</h3>
        <p className="mt-4 text-bone/80">{pass.description}</p>
        {!compact && pass.more?.map((m) => (
          <p key={m} className="mt-3 text-[0.9375rem] text-bone/70">
            {m}
          </p>
        ))}
        <div className="mt-auto pt-6">
          <a
            href={links.tickets}
            target="_blank"
            rel="noopener"
            className={cn(
              "label-mono inline-flex items-center gap-2 rounded-[2px] px-4 py-2.5 transition-colors",
              pass.featured ? "bg-blaze text-bone lantern-glow hover:bg-blaze-deep" : "border border-bone/20 text-bone hover:border-lantern/60 hover:text-lantern",
            )}
          >
            Purchase
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div aria-hidden className="perforated-y w-[2px] shrink-0 self-stretch bg-bone/15" />

      <div className="flex w-24 shrink-0 flex-col items-center justify-between bg-soot/60 py-5 sm:w-28">
        <span className="label-mono [writing-mode:vertical-rl] rotate-180 text-[0.625rem] text-bone/35">{serial}</span>
        <p className="display text-[2rem] leading-none text-lantern sm:text-[2.5rem]">
          <span className="text-[0.55em] align-top">$</span>
          {pass.price}
        </p>
        <span className="label-mono [writing-mode:vertical-rl] rotate-180 text-[0.625rem] text-bone/35">Admit one</span>
      </div>
    </article>
  );
}
