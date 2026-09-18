"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cast } from "@/content/site";
import { CastCard } from "./CastCard";
import { DossierBody } from "./Dossier";

/**
 * Grid of all characters. Opening one shows a dossier overlay and pushes /characters/<slug>/ onto history,
 * so the URL is shareable and Back closes it. A direct visit to that URL renders the standalone page instead.
 */
export function CastGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const basePath = "/characters/";

  useEffect(() => {
    // mark the grid's own history entry so Back from a dossier lands here
    if (!window.history.state?.dossier) window.history.replaceState({ ...(window.history.state ?? {}), dossier: null }, "", window.location.href);
    const onPop = (e: PopStateEvent) => setOpenSlug((e.state && e.state.dossier) || null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.dossier) window.history.back();
    else setOpenSlug(null);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (openSlug && !d.open) d.showModal();
    if (!openSlug && d.open) d.close();
    document.documentElement.style.overflow = openSlug ? "hidden" : "";
  }, [openSlug]);

  // Escape: route the native cancel through our close() so history stays in sync.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [close]);

  const open = useCallback((slug: string) => {
    setOpenSlug(slug);
    window.history.pushState({ dossier: slug }, "", `${basePath}${slug}/`);
  }, []);

  const swap = useCallback((slug: string) => {
    setOpenSlug(slug);
    window.history.replaceState({ dossier: slug }, "", `${basePath}${slug}/`);
  }, []);

  const idx = openSlug ? cast.findIndex((c) => c.slug === openSlug) : -1;
  const current = idx >= 0 ? cast[idx] : null;
  const prev = idx >= 0 ? cast[(idx - 1 + cast.length) % cast.length] : null;
  const next = idx >= 0 ? cast[(idx + 1) % cast.length] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cast.map((c, i) => (
          <CastCard key={c.slug} c={c} priority={i < 4} onOpen={open} />
        ))}
      </div>

      <dialog
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={current ? `${current.name} dossier` : "Character dossier"}
        className="m-auto w-[min(100vw-1.5rem,64rem)] max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[2px] border border-bone/10 bg-pine p-0 text-bone shadow-[0_40px_120px_-20px_rgb(0_0_0_/_0.9)] backdrop:bg-soot/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="p-5 sm:p-8 md:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {prev && (
                  <button type="button" onClick={() => swap(prev.slug)} className="label-mono rounded-[2px] border border-bone/15 px-3 py-2 text-bone/70 hover:border-lantern/60 hover:text-lantern">
                    ← {prev.name}
                  </button>
                )}
                {next && (
                  <button type="button" onClick={() => swap(next.slug)} className="label-mono rounded-[2px] border border-bone/15 px-3 py-2 text-bone/70 hover:border-lantern/60 hover:text-lantern">
                    {next.name} →
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone hover:border-lantern hover:text-lantern"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>
            </div>
            <DossierBody c={current} index={idx} total={cast.length} />
            <p className="label-mono mt-8 text-[0.6875rem] text-bone/55">
              Share this one:{" "}
              <Link href={`${basePath}${current.slug}/`} className="text-bone/70 underline decoration-fog underline-offset-4 hover:text-lantern">
                hopkinshauntedattraction.com{basePath}
                {current.slug}/
              </Link>
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
