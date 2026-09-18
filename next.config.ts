import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: Netlify serves out/ directly, no server runtime needed.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image URLs are rewritten to Netlify Image CDN in production (see src/lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 240, 320, 450],
  },
};

export default nextConfig;
