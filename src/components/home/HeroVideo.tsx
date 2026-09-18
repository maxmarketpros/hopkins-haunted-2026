"use client";

import { useEffect, useRef } from "react";

/**
 * Background loop for the home hero.
 *
 * - The poster is a real <img> (fetchpriority high) beneath the video, so the first big paint is a 12 KB image,
 *   not a video frame that arrives after the loop has buffered.
 * - The <video> is emitted as raw HTML so the `muted` attribute is in the markup (React only sets the property,
 *   and Chrome's autoplay policy needs the attribute). Sources attach after the page `load` event.
 * - Phones (under 768px), reduced-motion and Save-Data visitors keep the poster: no 3 MB download on cellular.
 */
const POSTER = "/video/hero-poster.webp";
const VIDEO_HTML = `<video class="hero-fade absolute inset-0 h-full w-full object-cover" muted loop playsinline preload="none" style="opacity:0"></video>`;
const SOURCES = `<source src="/video/hero-loop.webm" type="video/webm"><source src="/video/hero-loop.mp4" type="video/mp4">`;

export function HeroVideo() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = wrap.current?.querySelector("video");
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 767px)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (reduce || phone || Boolean(nav.connection?.saveData)) {
      v.remove();
      return;
    }
    let timer = 0;
    const start = () => {
      if (!v.isConnected || v.querySelector("source")) return;
      v.innerHTML = SOURCES;
      v.muted = true;
      v.load();
      v.style.opacity = "";
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POSTER} alt="" width={1280} height={720} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div ref={wrap} className="absolute inset-0" dangerouslySetInnerHTML={{ __html: VIDEO_HTML }} />
      {/* cool fog tint, darken for legibility, fade into the page ground */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_20%,rgb(47_111_106_/_0.28),transparent_70%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-pine/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pine via-pine/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pine/80 to-transparent" />
    </div>
  );
}
