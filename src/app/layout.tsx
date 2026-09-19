import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import Grain from "@/components/Grain";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

// Vercel exposes the production domain; the literal is the current deployment
// and only matters for builds made elsewhere.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://portfolio-three-rouge-80.vercel.app";

const title = "Hugo Pezzo — Producteur Audiovisuel";
const description =
  "Producteur audiovisuel et chargé de projets culturels à Montpellier. Coordination de tournages, courts-métrages, jeux vidéo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: "Hugo Pezzo",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Grain />
      </body>
    </html>
  );
}
