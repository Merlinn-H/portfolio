import type { APIRoute } from "astro";
import { getSite } from "@/lib/content";

export const GET: APIRoute = async () => {
  const site = await getSite();
  const base = (site.url || "https://hugopezzo.fr").replace(/\/$/, "");
  const body = `User-Agent: *\nAllow: /\nDisallow: /keystatic\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
