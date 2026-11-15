export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Préfixe d'URL : le français est à la racine, l'anglais sous /en. */
export const localePrefix = (l: Locale) => (l === "en" ? "/en" : "");
export const href = (l: Locale, path: string) => `${localePrefix(l)}${path === "/" && l === "en" ? "" : path}` || "/";

/** Micro-copies de l'interface (le contenu éditorial, lui, est dans le CMS). */
const dict = {
  fr: {
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    home: "Accueil",
    navLabel: "Navigation principale",
    langLabel: "Langue",
    otherLang: "English",
    hidden: "Masqué",
    hiddenPage: "Cette page est masquée : elle n'existe pas en production.",
    allProjects: "Tous les projets",
    seeProject: "Voir le projet",
    role: "Rôle",
    year: "Année",
    watch: "Lire le film",
    watchOn: "Lecture via YouTube (chargé uniquement au clic)",
    visit: "Visiter",
    next: "Projet suivant",
    films: "Films",
    games: "Jeux vidéo",
    by: "de",
    write: "Écrire",
    notFoundTitle: "Coupez !",
    notFoundText: "Cette scène n'existe pas — ou elle a été coupée au montage.",
    notFoundBack: "Retour à l'accueil",
    introSkip: "Passer l'introduction",
    scroll: "Défiler",
    projectsIntro: "Production, studio, fiction.",
    contactCta: "Écrire à Hugo",
    backToTop: "Haut de page",
  },
  en: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    home: "Home",
    navLabel: "Main navigation",
    langLabel: "Language",
    otherLang: "Français",
    hidden: "Hidden",
    hiddenPage: "This page is hidden: it does not exist in production.",
    allProjects: "All projects",
    seeProject: "View project",
    role: "Role",
    year: "Year",
    watch: "Play the film",
    watchOn: "Plays via YouTube (loaded on click only)",
    visit: "Visit",
    next: "Next project",
    films: "Films",
    games: "Video games",
    by: "by",
    write: "Write",
    notFoundTitle: "Cut!",
    notFoundText: "This scene doesn't exist — or it ended up on the cutting-room floor.",
    notFoundBack: "Back to home",
    introSkip: "Skip intro",
    scroll: "Scroll",
    projectsIntro: "Production, studio, fiction.",
    contactCta: "Write to Hugo",
    backToTop: "Back to top",
  },
} as const;

export type Dict = { [K in keyof (typeof dict)["fr"]]: string };
export const ui = (l: Locale): Dict => dict[l];
