import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";
import { RootShell } from "@/components/layout/RootShell";

/**
 * Racine unique FR/EN : passer de /projets à /en/projets reste une navigation douce
 * (seul le paramètre `lang` change), donc pas de rechargement complet de la page.
 * Le français est servi à la racine grâce aux rewrites de next.config.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { metadataBase: new URL(site.url || "https://hugopezzo.fr") };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <RootShell locale={lang}>{children}</RootShell>;
}
