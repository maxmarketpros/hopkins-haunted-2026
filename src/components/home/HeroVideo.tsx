"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping background video for the home hero.
 * Falls back to the poster when the visitor prefers reduced motion or has Save-Data on.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [motionOk, setMotionOk] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = Boolean(nav.connection?.saveData);
    setMotionOk(!reduce && !saveData);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !motionOk) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [motionOk]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-soot">
      {motionOk ? (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/video/hero-poster.jpg"
          className="h-full w-full object-cover opacity-0 transition-opacity duration-[1400ms] ease-out"
          onCanPlay={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onLoadedData={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <source src="/video/hero-loop.webm" type="video/webm" />
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/video/hero-poster.jpg" alt="" className="h-full w-full object-cover" />
      )}
      {/* cool fog tint, darken for legibility, fade into the page ground */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_20%,rgb(47_111_106_/_0.28),transparent_70%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-pine/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pine via-pine/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pine/80 to-transparent" />
    </div>
  );
}
