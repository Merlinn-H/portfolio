import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lockfiles exist in parent directories too; stop Next from guessing the workspace root
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },
};

export default nextConfig;
