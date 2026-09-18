import { cn } from "@/lib/cn";

type Item = { q: string; a: readonly string[] };

/** Native accordions. Keyboard and screen-reader behaviour comes free from <details>. */
export function FaqList({ items, className, open }: { items: readonly Item[]; className?: string; open?: number }) {
  return (
    <div className={cn("divide-y divide-bone/10 border-y border-bone/10", className)}>
      {items.map((f, i) => (
        <details key={f.q} className="group" open={open === i}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left md:py-6 [&::-webkit-details-marker]:hidden">
            <span className="text-lede font-bold text-bone group-open:text-lantern">{f.q}</span>
            <span
              aria-hidden
              className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-transform duration-300 group-open:rotate-45 group-open:border-lantern/60 group-open:text-lantern"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M6 1v10M1 6h10" />
              </svg>
            </span>
          </summary>
          <div className="space-y-3 pb-6 pr-12 text-bone/80">
            {f.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
