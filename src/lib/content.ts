import type { ImageMetadata } from "astro";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import type { Locale } from "./i18n";

/**
 * Couche de lecture du contenu (build time uniquement).
 * Toutes les pages sont générées statiquement : aucune lecture au runtime.
 */

const reader = createReader(process.cwd(), keystaticConfig);

/** En production, les éléments « hidden » n'existent pas. En dev, ils restent visibles avec un badge. */
export const showHidden = import.meta.env.DEV;

/** Mémoïsation simple : le build lit chaque fichier une seule fois. */
function cache<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  const memo = new Map<string, Promise<R>>();
  return (...args: A) => {
    const key = JSON.stringify(args);
    if (!memo.has(key)) memo.set(key, fn(...args));
    return memo.get(key)!;
  };
}

export type Status = "published" | "hidden";
export type Localized = { fr: string; en: string };

export const pick = (v: Localized | undefined | null, locale: Locale) => (v?.[locale] || v?.fr || "").trim();

const visible = <T extends { status: Status }>(items: T[]) =>
  items.filter((i) => showHidden || i.status === "published");

const byOrder = <T extends { order: number | null }>(a: T, b: T) => (a.order ?? 99) - (b.order ?? 99);

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

/**
 * Toutes les images gérées par le CMS (src/assets/images/**), importées au build :
 * Astro les optimise (AVIF/WebP, tailles adaptées) et connaît leurs dimensions.
 */
const assets = import.meta.glob<ImageMetadata>("/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif}", {
  eager: true,
  import: "default",
});

export type Img = ImageMetadata;

export function img(src: string | null | undefined): Img | null {
  if (!src) return null;
  return assets[src] ?? null;
}

/* ------------------------------------------------------------------ */
/* Singletons                                                          */
/* ------------------------------------------------------------------ */

export const getSite = cache(async () => {
  const s = await reader.singletons.site.readOrThrow();
  return { ...s, portraitImg: img(s.portrait) };
});

export const getHome = cache(async () => {
  const h = await reader.singletons.home.readOrThrow();
  return visible(h.sections as Array<(typeof h.sections)[number] & { status: Status }>);
});

export const getSkills = cache(async () => (await reader.singletons.skills.readOrThrow()).categories);

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export const getProjects = cache(async () => {
  const all = await reader.collections.projects.all();
  return visible(
    all.map(({ slug, entry }) => ({
      slug,
      ...entry,
      status: entry.status as Status,
      coverImg: img(entry.cover),
      logoImg: img(entry.logo),
      galleryImgs: entry.gallery.map((g) => ({ img: img(g.image), alt: g.alt })).filter((g) => g.img),
    })),
  ).sort(byOrder);
});
export type Project = Awaited<ReturnType<typeof getProjects>>[number];

export const getProject = async (slug: string) => (await getProjects()).find((p) => p.slug === slug) ?? null;

export const getExperiences = cache(async () => {
  const all = await reader.collections.experiences.all();
  return visible(all.map(({ slug, entry }) => ({ slug, ...entry, status: entry.status as Status }))).sort(byOrder);
});

export const getFilms = cache(async () => {
  const all = await reader.collections.films.all();
  return visible(
    all.map(({ slug, entry }) => ({
      slug,
      ...entry,
      status: entry.status as Status,
      posterImg: img(entry.poster),
    })),
  ).sort(byOrder);
});

export const getGames = cache(async () => {
  const all = await reader.collections.games.all();
  return visible(
    all.map(({ slug, entry }) => ({
      slug,
      ...entry,
      status: entry.status as Status,
      logoImg: img(entry.logo),
    })),
  ).sort(byOrder);
});

export const getPages = cache(async () => {
  const all = await reader.collections.pages.all();
  return visible(all.map(({ slug, entry }) => ({ ...entry, slug, status: entry.status as Status })));
});

export const getPage = async (slug: string) => (await getPages()).find((p) => p.slug === slug) ?? null;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

/**
 * Sections de l'accueil réellement affichées : statut + contenu non vide.
 * Utilisé à la fois par l'accueil et par la nav, pour qu'un onglet ne pointe jamais vers une section vide.
 */
export const getRenderableSections = cache(async () => {
  const [sections, projects, experiences, skills, films, games] = await Promise.all([
    getHome(),
    getProjects(),
    getExperiences(),
    getSkills(),
    getFilms(),
    getGames(),
  ]);
  const hasContent: Record<string, boolean> = {
    hero: true,
    projects: projects.length > 0,
    manifesto: sections.some((s) => s.type === "manifesto" && (s.intro.fr || s.intro.en)),
    experience: experiences.length > 0,
    skills: skills.length > 0,
    influences: films.length + games.length > 0,
    contact: true,
  };
  return sections.filter((s) => hasContent[s.type]);
});

export type NavItem = { label: string; href: string; hidden: boolean; external?: boolean };

export const getNavigation = cache(async (locale: Locale): Promise<NavItem[]> => {
  const nav = await reader.singletons.navigation.readOrThrow();
  const sections = await getRenderableSections();
  const pages = await getPages();
  const prefix = locale === "en" ? "/en" : "";
  const out: NavItem[] = [];

  for (const item of nav.items) {
    let hidden = item.status === "hidden";
    let href = "";
    let external = false;
    const t = item.target;
    if (t.discriminant === "section") {
      const s = sections.find((x) => x.type === t.value);
      if (!s) continue; // section absente, vide, ou masquée en prod
      hidden ||= s.status === "hidden";
      href = `${prefix || ""}/#${t.value}`.replace("/en/#", "/en#");
    } else if (t.discriminant === "projects") {
      href = `${prefix}/projets`;
    } else if (t.discriminant === "page") {
      const p = pages.find((x) => x.slug === t.value);
      if (!p) continue;
      hidden ||= p.status === "hidden";
      href = `${prefix}/${p.slug}`;
    } else if (t.discriminant === "url") {
      if (!t.value) continue;
      href = t.value;
      external = true;
    }
    if (hidden && !showHidden) continue;
    out.push({ label: pick(item.label, locale), href, hidden, external });
  }
  return out;
});
