import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Blaze } from "./Blaze";

/**
 * Standard page section: blaze eyebrow, optional headline, container.
 * `seam` adds the cool fog light at the top edge.
 */
export function Section({
  id,
  blaze,
  title,
  lede,
  children,
  className,
  seam,
  narrow,
  headerClassName,
  titleSize = "lg",
}: {
  id?: string;
  blaze?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
  seam?: boolean;
  narrow?: boolean;
  headerClassName?: string;
  titleSize?: "lg" | "md" | "xl";
}) {
  const sizeCls = { xl: "text-display-xl", lg: "text-display-lg", md: "text-display-md" }[titleSize];
  return (
    <section id={id} className={cn("py-20 md:py-28", seam && "fog-seam", className)}>
      <div className={narrow ? "container-prose" : "container-page"}>
        {(blaze || title) && (
          <header className={cn("mb-10 md:mb-14 max-w-3xl", headerClassName)}>
            {blaze && <Blaze label={blaze} className="mb-5" />}
            {title && <h2 className={cn("display text-bone", sizeCls)}>{title}</h2>}
            {lede && <p className="mt-5 text-lede text-bone/75 max-w-2xl">{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
