"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping background video for the home hero.
 *
 * - The <video> is emitted as raw HTML so the `muted` attribute is in the markup (React only sets the property,
 *   and Chrome's autoplay policy needs the attribute).
 * - Sources are attached only after the page has loaded, so the poster paints first and the 3 MB loop never
 *   competes with the logo, fonts and JS for bandwidth.
 * - Visitors with reduced-motion or Save-Data keep the poster.
 */
const POSTER = "/video/hero-poster.webp";
const VIDEO_HTML = `<video class="hero-fade h-full w-full object-cover" muted loop playsinline preload="none" poster="${POSTER}"></video>`;
const SOURCES = `<source src="/video/hero-loop.webm" type="video/webm"><source src="/video/hero-loop.mp4" type="video/mp4">`;

export function HeroVideo() {
  const wrap = useRef<HTMLDivElement>(null);
  const [posterOnly, setPosterOnly] = useState(false);

  useEffect(() => {
    const v = wrap.current?.querySelector("video");
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (reduce || Boolean(nav.connection?.saveData)) {
      setPosterOnly(true);
      return;
    }
    let timer = 0;
    const start = () => {
      if (!v.isConnected || v.querySelector("source")) return;
      v.innerHTML = SOURCES;
      v.muted = true;
      v.load();
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    const schedule = () => {
      timer = window.setTimeout(start, 250);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-soot">
      {posterOnly ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={POSTER} alt="" className="h-full w-full object-cover" />
      ) : (
        <div ref={wrap} className="h-full w-full" dangerouslySetInnerHTML={{ __html: VIDEO_HTML }} />
      )}
      {/* cool fog tint, darken for legibility, fade into the page ground */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_20%,rgb(47_111_106_/_0.28),transparent_70%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-pine/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pine via-pine/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pine/80 to-transparent" />
    </div>
  );
}
