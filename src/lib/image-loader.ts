"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Netlify Image CDN.
 * Production: /.netlify/images?url=<path>&w=<width>&q=<quality> (format negotiated from the Accept header).
 * Development (`next dev` without `netlify dev`): serve the file as-is; the width query is ignored by the static server
 * but satisfies next/image's loader contract.
 */
export default function netlifyImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("data:")) return src;
  if (process.env.NODE_ENV === "development") return `${src}?w=${width}`;
  const params = new URLSearchParams({ url: src, w: String(width), q: String(quality ?? 78) });
  return `/.netlify/images?${params.toString()}`;
}
