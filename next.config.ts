import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  experimental: { globalNotFound: true, inlineCss: true },
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75] },
  // Anciennes URL (v1) → nouvelles pages, pour ne casser aucun lien partagé.
  async redirects() {
    return [
      { source: "/489productions", destination: "/projets/489productions", permanent: true },
      { source: "/films", destination: "/projets", permanent: true },
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
      { source: "/en/projects/:slug", destination: "/en/projets/:slug", permanent: true },
      { source: "/projects/:slug", destination: "/projets/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
