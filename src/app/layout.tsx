import type { Metadata } from "next";
import { Geist, Open_Sans } from "next/font/google";
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
      <body className={`${geist.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
