import type { MetadataRoute } from "next";
import { getPages, getProjects, getSite } from "@/lib/content";
import { href, locales } from "@/lib/i18n";

/** Sitemap : les éléments « hidden » n'existent pas en production, donc n'y apparaissent jamais. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSite();
  const base = site.url || "https://hugopezzo.fr";
  const published = <T extends { status: string }>(xs: T[]) => xs.filter((x) => x.status === "published");
  const paths = [
    "/",
    "/projets",
    ...published(await getProjects()).map((p) => `/projets/${p.slug}`),
    ...published(await getPages()).map((p) => `/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${href("fr", path)}`,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${base}${href(l, path)}`])) },
  }));
}
