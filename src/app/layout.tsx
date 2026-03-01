import type { Metadata } from "next";
import { Geist, Open_Sans, Cormorant_Garamond } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hugo Pezzo — Producteur Audiovisuel",
  description: "Portfolio de Hugo Pezzo, Producteur Audiovisuel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geist.variable} ${openSans.variable} ${cormorant.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
