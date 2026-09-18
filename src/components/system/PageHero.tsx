import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Blaze } from "./Blaze";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/** Inner-page hero: full-bleed photo, eyebrow, poster title, one sentence, actions. */
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
  const minH = { sm: "min-h-[48vh]", md: "min-h-[62vh] md:min-h-[68vh]", lg: "min-h-[74vh] md:min-h-[82vh]" }[size];
  return (
    <section className={cn("relative isolate flex items-end overflow-hidden bg-soot", minH)}>
      {image && (
        <div className="absolute inset-0 -z-10">
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
          <div className="absolute inset-0 bg-soot/30" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-pine via-pine/75 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-soot/70 to-transparent" />
        </div>
      )}
      {!image && <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(47_111_106_/_0.14),transparent_70%)]" />}
      <div className="container-page relative pb-16 pt-40 md:pb-24 md:pt-56">
        <Blaze label={blaze} className="mb-6" />
        <h1 className={cn("display max-w-5xl text-bone", size === "lg" ? "text-display-xl" : "text-display-xl md:text-[clamp(3.5rem,2rem+5.5vw,7rem)]")}>
          {title}
        </h1>
        {lede && <p className="mt-7 max-w-2xl text-lede text-bone/75">{lede}</p>}
        {actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}
        {children}
      </div>
    </section>
  );
}
