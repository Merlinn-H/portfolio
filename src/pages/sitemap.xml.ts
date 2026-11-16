import type { APIRoute } from "astro";
import { getPages, getProjects, getSite } from "@/lib/content";
import { href, locales } from "@/lib/i18n";

/** Sitemap : les éléments « hidden » n'existent pas en production, donc n'y apparaissent jamais. */
export const GET: APIRoute = async () => {
  const site = await getSite();
  const base = (site.url || "https://hugopezzo.fr").replace(/\/$/, "");
  const published = <T extends { status: string }>(xs: T[]) => xs.filter((x) => x.status === "published");
  const paths = [
    "/",
    "/projets",
    ...published(await getProjects()).map((p) => `/projets/${p.slug}`),
    ...published(await getPages()).map((p) => `/${p.slug}`),
    ...(site.cvEnabled ? ["/cv"] : []),
  ];
  const urls = paths
    .map((path) => {
      const alts = locales
        .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${base}${href(l, path)}" />`)
        .join("");
      return `<url><loc>${base}${href("fr", path)}</loc>${alts}</url>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
