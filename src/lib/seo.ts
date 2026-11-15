import { getSite, pick } from "./content";
import { href, type Locale } from "./i18n";

export type Seo = {
  title: string;
  description: string;
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  ogImage: string;
  ogLocale: string;
  noindex: boolean;
  siteName: string;
};

/** Métadonnées d'une page, avec hreflang FR/EN et noindex pour les éléments masqués (visibles en dev seulement). */
export async function pageSeo({
  locale,
  path,
  title,
  description,
  hidden = false,
  ogImage,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  hidden?: boolean;
  ogImage?: string;
}): Promise<Seo> {
  const site = await getSite();
  const base = (site.url || "https://hugopezzo.fr").replace(/\/$/, "");
  const abs = (p: string) => `${base}${p}`;
  return {
    title: title ? `${title} — ${site.name}` : pick(site.seoTitle, locale) || site.name,
    description: description || pick(site.seoDescription, locale),
    canonical: abs(href(locale, path)),
    alternates: [
      { hreflang: "fr", href: abs(href("fr", path)) },
      { hreflang: "en", href: abs(href("en", path)) },
      { hreflang: "x-default", href: abs(href("fr", path)) },
    ],
    ogImage: abs(ogImage ?? `/og/${locale}.png`),
    ogLocale: locale === "fr" ? "fr_FR" : "en_US",
    noindex: hidden,
    siteName: site.name,
  };
}
