import { Gloock } from "next/font/google";
import localFont from "next/font/local";

/** Police display : seule police préchargée. */
export const display = Gloock({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gloock",
  preload: true,
});

/**
 * Police de texte : Hanken Grotesk (OFL), 2 graisses statiques en sous-ensemble latin (≈ 13 kB chacune)
 * au lieu du fichier variable complet (35 kB) servi par Google Fonts. Pas de preload.
 */
export const text = localFont({
  src: [
    { path: "../fonts/hanken-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/hanken-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-hanken",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});
