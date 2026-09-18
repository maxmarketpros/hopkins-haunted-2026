import type { Pass } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * A pass as a flat tile: giant price, name, one sentence.
 * `details` also prints the long-form notes (tickets page).
 */
export function PassTile({ pass, details }: { pass: Pass; details?: boolean }) {
  return (
    <article
      className={cn(
        "flex flex-col border-t-2 pt-8",
        pass.featured ? "border-blaze" : "border-bone/15",
      )}
    >
      <p className={cn("label-mono", pass.featured ? "text-blaze" : "text-bone/55")}>{pass.featured ? "Most popular" : pass.kicker}</p>
      <p className="display mt-5 text-[4.5rem] leading-none text-bone md:text-[5rem]">
        <span className="align-top text-[0.45em] text-bone/60">$</span>
        {pass.price}
      </p>
      <h3 className="display mt-4 text-display-sm text-bone">{pass.name}</h3>
      <p className="mt-4 max-w-sm text-bone/70">{pass.description}</p>
      {details &&
        pass.more?.map((m) => (
          <p key={m} className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-bone/55">
            {m}
          </p>
        ))}
    </article>
  );
}
