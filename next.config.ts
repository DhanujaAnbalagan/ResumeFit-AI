import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for pdf-parse to work in API routes
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
