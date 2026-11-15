import { Gloock, Hanken_Grotesk } from "next/font/google";

/** Police display : seule police préchargée. */
export const display = Gloock({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gloock",
  preload: true,
});

/** Police de texte : 2 graisses, pas de preload. */
export const text = Hanken_Grotesk({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
  preload: false,
});
