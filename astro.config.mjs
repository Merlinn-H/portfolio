// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

const isDev = process.argv.includes("dev");
// Variable lue dans l'environnement du build (Vercel › Environment Variables, ou le shell en local).
const githubMode = process.env.PUBLIC_KEYSTATIC_STORAGE === "github";
// Le back-office n'existe qu'en dev (stockage local) ou en production avec le mode GitHub (authentifié).
// En production sans mode GitHub, /keystatic et /api/keystatic n'existent pas : aucun point d'écriture exposé.
const withAdmin = isDev || githubMode;

export default defineConfig({
  site: "https://hugopezzo.fr",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  // Adaptateur Vercel uniquement pour un build sur Vercel (le mode GitHub de Keystatic a besoin de routes serveur).
  adapter: process.env.VERCEL ? vercel() : undefined,
  integrations: withAdmin ? [react(), keystatic()] : [],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  image: { responsiveStyles: false },
  redirects: {
    "/489productions": "/projets/489productions",
    "/films": "/projets",
    "/fr": "/",
    // /fr/… n'existe pas (le français est à la racine) : anciennes adresses redirigées.
    "/fr/projets": "/projets",
    "/fr/projets/[slug]": "/projets/[slug]",
    "/fr/[slug]": "/[slug]",
    "/projects/[slug]": "/projets/[slug]",
    "/en/projects/[slug]": "/en/projets/[slug]",
  },
  // Polices auto-hébergées (OFL), avec polices de secours aux métriques ajustées (pas de saut de mise en page).
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Gloock",
      cssVariable: "--font-gloock",
      fallbacks: ["Times New Roman", "serif"],
      display: "swap",
      options: { variants: [{ src: ["./src/fonts/gloock-latin-400-normal.woff2"], weight: 400, style: "normal" }] },
    },
    {
      provider: fontProviders.local(),
      name: "Hanken Grotesk",
      cssVariable: "--font-hanken",
      fallbacks: ["Arial", "sans-serif"],
      display: "swap",
      options: {
        variants: [
          { src: ["./src/fonts/hanken-grotesk-latin-400-normal.woff2"], weight: 400, style: "normal" },
          { src: ["./src/fonts/hanken-grotesk-latin-600-normal.woff2"], weight: 600, style: "normal" },
        ],
      },
    },
  ],
  devToolbar: { enabled: false },
});
