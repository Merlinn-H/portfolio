import type { APIRoute, GetStaticPaths } from "astro";
import { getSite, pick } from "@/lib/content";
import { locales, toLocale } from "@/lib/i18n";
import { ogPng } from "@/lib/og";

export const getStaticPaths: GetStaticPaths = () => locales.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = async ({ params }) => {
  const locale = toLocale(params.lang ?? "fr");
  const site = await getSite();
  return ogPng({ eyebrow: pick(site.role, locale), title: site.name, footer: pick(site.tagline, locale) });
};
