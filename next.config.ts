import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  experimental: { globalNotFound: true, inlineCss: true },
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75] },
  // Le français est servi à la racine : /projets → /fr/projets (route [lang]), sans middleware.
  // Exclus : /en, /keystatic, /api, les fichiers internes et tout chemin contenant un point (images, sitemap…).
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/fr" },
        { source: "/:path((?!en(?:/|$)|fr(?:/|$)|keystatic(?:/|$)|api/|_next/|images/)[^.]+)", destination: "/fr/:path" },
      ],
      fallback: [],
    };
  },
  // Anciennes URL (v1) → nouvelles pages, pour ne casser aucun lien partagé.
  async redirects() {
    return [
      { source: "/489productions", destination: "/projets/489productions", permanent: true },
      { source: "/films", destination: "/projets", permanent: true },
      { source: "/fr", destination: "/", permanent: true },
      // /fr/… n'est qu'une adresse interne (le français est à la racine) — sauf les images de partage générées.
      { source: "/fr/:path((?!.*opengraph-image).+)", destination: "/:path", permanent: true },
      { source: "/en/projects/:slug", destination: "/en/projets/:slug", permanent: true },
      { source: "/projects/:slug", destination: "/projets/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
