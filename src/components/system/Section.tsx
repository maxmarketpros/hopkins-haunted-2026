import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Blaze } from "./Blaze";

/**
 * Page section: generous vertical room, optional eyebrow + short headline.
 * `align="center"` centers the header (used for the roomy one-idea sections).
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
  align = "left",
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
  align?: "left" | "center";
}) {
  const sizeCls = { xl: "text-display-xl", lg: "text-display-lg", md: "text-display-md" }[titleSize];
  return (
    <section id={id} className={cn("py-24 md:py-36", seam && "fog-seam", className)}>
      <div className={narrow ? "container-prose" : "container-page"}>
        {(blaze || title) && (
          <header className={cn("mb-14 md:mb-20", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl", headerClassName)}>
            {blaze && <Blaze label={blaze} className={cn("mb-5", align === "center" && "justify-center")} />}
            {title && <h2 className={cn("display text-bone", sizeCls)}>{title}</h2>}
            {lede && <p className={cn("mt-6 text-lede text-bone/70 max-w-2xl", align === "center" && "mx-auto")}>{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
