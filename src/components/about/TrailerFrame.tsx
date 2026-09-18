"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** The one trailer, in a cinema frame. Poster until play; then the real file with sound and controls. */
export function TrailerFrame({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      const v = video.current;
      if (!v) return;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    });
  };

  return (
    <figure className={cn("relative", className)}>
      {/* film leader mark */}
      <div className="label-mono mb-3 flex items-center justify-between text-[0.6875rem] text-bone/55">
        <span>Official trailer</span>
        <span>Since {site.since}</span>
      </div>
      <div className="relative overflow-hidden rounded-[2px] border border-bone/10 bg-soot shadow-[0_30px_80px_-30px_rgb(0_0_0_/_0.9)]">
        {/* letterbox: content is 4:3 inside a 16:9 frame */}
        <div className="relative aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative aspect-[4/3] h-full">
              {playing ? (
                <video ref={video} controls playsInline preload="auto" poster="/video/trailer-poster.webp" className="h-full w-full bg-black">
                  <source src="/video/trailer.mp4" type="video/mp4" />
                  Your browser can’t play this video. <a href="/video/trailer.mp4">Download the trailer</a>.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={start}
                  className="group relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-lantern"
                  aria-label="Play the trailer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/video/trailer-poster.webp" alt="" className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-bone/40 bg-pine/60 text-bone backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-105 group-hover:border-lantern group-hover:shadow-[0_0_50px_rgb(201_162_74_/_0.35)]">
                      <svg width="22" height="22" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                        <path d="M3 1.5v9l7-4.5-7-4.5Z" />
                      </svg>
                    </span>
                  </span>
                  <span className="label-mono absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6875rem] text-bone/70">Sound on</span>
                </button>
              )}
            </div>
          </div>
          {/* subtle sprocket edges */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[12.5%] bg-[repeating-linear-gradient(180deg,transparent_0_18px,rgb(237_230_214_/_0.05)_18px_26px)] max-md:hidden" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[12.5%] bg-[repeating-linear-gradient(180deg,transparent_0_18px,rgb(237_230_214_/_0.05)_18px_26px)] max-md:hidden" />
        </div>
      </div>
    </figure>
  );
}
