import type { APIRoute, GetStaticPaths } from "astro";
import { getProject, getProjects, getSite, pick } from "@/lib/content";
import { locales, toLocale } from "@/lib/i18n";
import { ogPng } from "@/lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();
  return locales.flatMap((lang) => projects.map((p) => ({ params: { lang, slug: p.slug } })));
};

export const GET: APIRoute = async ({ params }) => {
  const locale = toLocale(params.lang ?? "fr");
  const [site, p] = await Promise.all([getSite(), getProject(params.slug ?? "")]);
  return ogPng({
    eyebrow: p ? pick(p.kicker, locale) : site.name,
    title: p?.title ?? site.name,
    footer: [site.name, p?.year].filter(Boolean).join(" — "),
    image: p?.cover,
  });
};
