import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Blaze } from "./Blaze";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/** Inner-page hero: full-bleed photo, blaze, wood-type title, one sentence, actions. */
export function PageHero({
  blaze,
  title,
  lede,
  image,
  imageAlt = "",
  imagePosition = "center",
  actions,
  size = "md",
  children,
}: {
  blaze: string;
  title: ReactNode;
  lede?: ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  actions?: ReactNode;
  size?: "md" | "lg" | "sm";
  children?: ReactNode;
}) {
  const minH = { sm: "min-h-[44vh]", md: "min-h-[58vh] md:min-h-[62vh]", lg: "min-h-[70vh] md:min-h-[78vh]" }[size];
  return (
    <section className={cn("relative isolate flex items-end overflow-hidden bg-soot", minH)}>
      {image && (
        <div className="absolute inset-0 -z-10 vignette">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            placeholder={blurMap[image] ? "blur" : "empty"}
            blurDataURL={blurMap[image]}
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          {/* fog tint + fade into the page ground */}
          <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_30%,rgb(47_111_106_/_0.18),transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-pine via-pine/70 to-transparent" />
        </div>
      )}
      {!image && <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(47_111_106_/_0.22),transparent_70%)]" />}
      <div className="container-page relative pb-14 pt-32 md:pb-20 md:pt-40">
        <Blaze label={blaze} className="mb-6" />
        <h1 className={cn("display text-bone max-w-4xl", size === "lg" ? "text-display-xl" : "text-display-lg")}>{title}</h1>
        {lede && <p className="mt-6 max-w-2xl text-lede text-bone/80">{lede}</p>}
        {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
        {children}
      </div>
    </section>
  );
}
