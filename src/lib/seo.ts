import type { Metadata } from "next";
import { getSite, pick } from "./content";
import { href, type Locale } from "./i18n";

/** Métadonnées d'une page, avec hreflang FR/EN et noindex pour les éléments masqués (visibles en dev seulement). */
export async function pageMetadata({
  locale,
  path,
  title,
  description,
  hidden = false,
  image,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  hidden?: boolean;
  image?: string;
}): Promise<Metadata> {
  const site = await getSite();
  const base = site.url || "https://hugopezzo.fr";
  const defaultTitle = pick(site.seoTitle, locale) || site.name;
  const desc = description || pick(site.seoDescription, locale);
  const fullTitle = title ? `${title} — ${site.name}` : defaultTitle;
  const canonical = href(locale, path);

  return {
    metadataBase: new URL(base),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical,
      languages: { fr: href("fr", path), en: href("en", path), "x-default": href("fr", path) },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description: desc,
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
    robots: hidden ? { index: false, follow: false } : undefined,
  };
}
