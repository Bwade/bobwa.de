import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits plain HTML/CSS/JS into ./out.
  // No server functions and no ISR, so nothing that can accrue usage on Vercel.
  output: 'export',

  // Required by `output: 'export'`. Image Optimization is a server feature.
  // This site ships no raster imagery, so nothing is lost.
  images: { unoptimized: true },

  // Emit /path/index.html so the export works on any static host, not just Vercel.
  trailingSlash: true,
};

export default nextConfig;
