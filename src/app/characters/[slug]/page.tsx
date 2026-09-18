import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DossierBody } from "@/components/cast/Dossier";
import { Blaze } from "@/components/system/Blaze";
import { cast, site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return cast.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/characters/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = cast.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.name} · Characters`,
    description: `${c.name}: ${c.descriptor} One of the live characters waiting on the Hopkins Haunted Attraction trail in Simpsonville, SC.`,
    alternates: { canonical: `/characters/${c.slug}/` },
    openGraph: {
      title: `${c.name} | ${site.name}`,
      url: `/characters/${c.slug}/`,
      images: [{ url: c.image, width: c.width, height: c.height, alt: c.name }],
    },
  };
}

export default async function CharacterPage({ params }: PageProps<"/characters/[slug]">) {
  const { slug } = await params;
  const idx = cast.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const c = cast[idx];
  const prev = cast[(idx - 1 + cast.length) % cast.length];
  const next = cast[(idx + 1) % cast.length];

  return (
    <>
      <section className="fog-seam pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Blaze label="Cast" />
            <Link href="/characters/" className="label-mono text-bone/60 underline decoration-fog underline-offset-4 hover:text-lantern">
              ← All characters
            </Link>
          </div>
          <DossierBody c={c} index={idx} total={cast.length} headingTag="h1" />
          <nav aria-label="Other characters" className="mt-14 grid gap-3 border-t border-bone/10 pt-8 sm:grid-cols-2">
            <Link href={`/characters/${prev.slug}/`} className="group surface flex items-center justify-between rounded-[2px] px-5 py-4 hover:border-lantern/40">
              <span className="label-mono text-bone/60">Previous</span>
              <span className="display text-[1.25rem] text-bone group-hover:text-lantern">← {prev.name}</span>
            </Link>
            <Link href={`/characters/${next.slug}/`} className="group surface flex items-center justify-between rounded-[2px] px-5 py-4 hover:border-lantern/40">
              <span className="label-mono text-bone/60">Next</span>
              <span className="display text-[1.25rem] text-bone group-hover:text-lantern">{next.name} →</span>
            </Link>
          </nav>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Characters", path: "/characters/" },
          { name: c.name, path: `/characters/${c.slug}/` },
        ])}
      />
    </>
  );
}
