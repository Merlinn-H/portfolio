import { config, collection, singleton, fields } from "@keystatic/core";

/**
 * Keystatic — back-office du portfolio (/keystatic en développement).
 *
 * Stockage :
 *  - par défaut `local` : le contenu est écrit dans les fichiers du repo (content/**).
 *  - `PUBLIC_KEYSTATIC_STORAGE=github` + variables GitHub (voir docs/redesign/REVIEW.md) :
 *    le back-office est servi en production et commite directement dans le repo.
 */

const isGithub = import.meta.env.PUBLIC_KEYSTATIC_STORAGE === "github";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const loc = (label: string, opts: { multiline?: boolean; description?: string; required?: boolean } = {}) =>
  fields.object(
    {
      fr: fields.text({
        label: "Français",
        multiline: opts.multiline,
        validation: opts.required ? { isRequired: true } : undefined,
      }),
      en: fields.text({ label: "English", multiline: opts.multiline }),
    },
    { label, description: opts.description, layout: [6, 6] },
  );

const status = fields.select({
  label: "Statut",
  description: "« Masqué » retire l'élément du site public (nav, sitemap, 404 en production).",
  options: [
    { label: "Publié", value: "published" },
    { label: "Masqué", value: "hidden" },
  ],
  defaultValue: "published",
});

const order = fields.integer({
  label: "Ordre",
  description: "Plus petit = affiché en premier.",
  defaultValue: 10,
});

const image = (label: string, dir: string, description?: string) =>
  fields.image({
    label,
    description,
    // Les images vivent dans src/assets pour être optimisées par Astro au build (AVIF/WebP, tailles).
    directory: `src/assets/images/${dir}`,
    publicPath: `/src/assets/images/${dir}/`,
  });

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

export default config({
  storage: isGithub
    ? {
        kind: "github",
        repo: {
          owner: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_OWNER ?? "Merlinn-H",
          name: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO ?? "portfolio",
        },
      }
    : { kind: "local" },

  ui: {
    brand: { name: "Hugo Pezzo — Back-office" },
    navigation: {
      "Site & navigation": ["site", "navigation", "home", "skills"],
      Contenus: ["projects", "experiences", "pages"],
      Influences: ["films", "games"],
    },
  },

  singletons: {
    site: singleton({
      label: "Réglages du site",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Nom", validation: { isRequired: true } }),
        url: fields.url({
          label: "URL publique du site",
          description: "Utilisée pour le SEO, le sitemap et les images de partage.",
        }),
        role: loc("Titre / métier", { required: true }),
        tagline: loc("Phrase d'accroche", { multiline: true }),
        quote: fields.object(
          {
            text: fields.text({ label: "Citation" }),
            source: fields.text({ label: "Source" }),
            hanzi: fields.text({
              label: "Titre original (caractères)",
              description: "Ex. 英雄本色 — utilisé comme signature typographique.",
            }),
          },
          { label: "Citation de cinéma" },
        ),
        portrait: image("Portrait", "site", "Format carré ou vertical, ~2000 px."),
        portraitAlt: loc("Texte alternatif du portrait"),
        introEnabled: fields.checkbox({
          label: "Jouer l'ident d'introduction",
          description: "Logo animé ≤ 1,2 s, une fois par session, passable au clic. Décocher pour le désactiver.",
          defaultValue: true,
        }),
        introLogo: image("Logo de l'ident", "site", "PNG blanc sur fond transparent (il est recoloré en CSS)."),
        introLogoAlt: fields.text({ label: "Nom du logo de l'ident (ex. 489Productions)" }),
        email: fields.text({ label: "E-mail de contact" }),
        bookingUrl: fields.url({
          label: "Lien de prise de rendez-vous (optionnel)",
          description: "Ex. Calendly, Cal.com. Vide = pas de bouton.",
        }),
        bookingLabel: loc("Texte du bouton de rendez-vous"),
        cvEnabled: fields.checkbox({
          label: "Afficher le CV",
          description: "Page /cv générée à partir du parcours, des compétences et des projets, avec bouton dans la section Contact.",
          defaultValue: true,
        }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Nom (LinkedIn, Instagram…)" }),
            url: fields.url({ label: "URL" }),
          }),
          { label: "Réseaux", itemLabel: (p) => p.fields.label.value || "Réseau" },
        ),
        seoTitle: loc("Titre SEO par défaut"),
        seoDescription: loc("Description SEO par défaut", { multiline: true }),
        footer: loc("Mention de pied de page"),
      },
    }),

    navigation: singleton({
      label: "Navigation (onglets)",
      path: "content/navigation",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            label: loc("Libellé", { required: true }),
            target: fields.conditional(
              fields.select({
                label: "Destination",
                options: [
                  { label: "Section de la page d'accueil", value: "section" },
                  { label: "Liste des projets", value: "projects" },
                  { label: "Page libre", value: "page" },
                  { label: "Lien externe", value: "url" },
                ],
                defaultValue: "section",
              }),
              {
                section: fields.select({
                  label: "Section",
                  options: [
                    { label: "Projets", value: "projects" },
                    { label: "Compétences", value: "skills" },
                    { label: "Parcours", value: "experience" },
                    { label: "Influences", value: "influences" },
                    { label: "Manifeste", value: "manifesto" },
                    { label: "Contact", value: "contact" },
                  ],
                  defaultValue: "projects",
                }),
                projects: fields.empty(),
                page: fields.relationship({ label: "Page", collection: "pages" }),
                url: fields.url({ label: "URL" }),
              },
            ),
            status,
          }),
          {
            label: "Onglets",
            description: "Glisser pour réordonner. Passer un onglet en « Masqué » le retire du menu.",
            itemLabel: (p) =>
              `${p.fields.label.fields.fr.value || "Onglet"}${p.fields.status.value === "hidden" ? " (masqué)" : ""}`,
          },
        ),
      },
    }),

    home: singleton({
      label: "Page d'accueil",
      path: "content/home",
      format: { data: "yaml" },
      schema: {
        sections: fields.array(
          fields.object({
            type: fields.select({
              label: "Section",
              options: [
                { label: "Ouverture (hero)", value: "hero" },
                { label: "Manifeste", value: "manifesto" },
                { label: "Projets", value: "projects" },
                { label: "Compétences", value: "skills" },
                { label: "Parcours", value: "experience" },
                { label: "Influences", value: "influences" },
                { label: "Contact", value: "contact" },
              ],
              defaultValue: "projects",
            }),
            eyebrow: loc("Sur-titre"),
            title: loc("Titre"),
            intro: loc("Texte d'introduction", { multiline: true }),
            status,
          }),
          {
            label: "Sections (dans l'ordre d'affichage)",
            itemLabel: (p) =>
              `${p.fields.type.value}${p.fields.status.value === "hidden" ? " (masquée)" : ""} — ${p.fields.title.fields.fr.value}`,
          },
        ),
      },
    }),

    skills: singleton({
      label: "Compétences",
      path: "content/skills",
      format: { data: "yaml" },
      schema: {
        categories: fields.array(
          fields.object({
            name: loc("Catégorie", { required: true }),
            items: fields.array(loc("Compétence"), {
              label: "Compétences",
              itemLabel: (p) => p.fields.fr.value || "—",
            }),
          }),
          { label: "Catégories", itemLabel: (p) => p.fields.name.fields.fr.value || "Catégorie" },
        ),
      },
    }),
  },

  collections: {
    projects: collection({
      label: "Projets",
      slugField: "title",
      path: "content/projects/*",
      format: { data: "yaml" },
      columns: ["title", "order", "status"],
      schema: {
        title: fields.slug({ name: { label: "Titre", validation: { isRequired: true } } }),
        status,
        order,
        category: fields.select({
          label: "Catégorie",
          options: [
            { label: "Société de production", value: "production" },
            { label: "Studio de jeu vidéo", value: "studio" },
            { label: "Court-métrage", value: "short" },
            { label: "Autre", value: "other" },
          ],
          defaultValue: "short",
        }),
        kicker: loc("Étiquette (ex. « Studio de jeu vidéo »)"),
        year: fields.text({ label: "Année(s)", description: "Laisser vide si inconnue." }),
        role: loc("Rôle(s)", { description: "Séparer plusieurs rôles par une virgule." }),
        summary: loc("Résumé (1–2 phrases)", { multiline: true, required: true }),
        body: loc("Texte détaillé", { multiline: true, description: "Paragraphes séparés par une ligne vide." }),
        tagline: loc("Signature (optionnelle)"),
        cover: image("Image de couverture", "projects"),
        coverAlt: loc("Texte alternatif de la couverture"),
        logo: image("Logo (optionnel)", "projects"),
        gallery: fields.array(fields.object({ image: image("Image", "projects"), alt: loc("Texte alternatif") }), {
          label: "Galerie",
          itemLabel: (p) => p.fields.alt.fields.fr.value || "Image",
        }),
        youtubeId: fields.text({
          label: "Vidéo YouTube (ID)",
          description: "La partie après « v= » dans l'URL. Chargée uniquement au clic.",
        }),
        highlights: fields.array(fields.object({ title: loc("Titre"), text: loc("Texte", { multiline: true }) }), {
          label: "Points clés / services",
          itemLabel: (p) => p.fields.title.fields.fr.value || "Point",
        }),
        cta: fields.object(
          {
            text: loc("Phrase d'appel"),
            button: loc("Texte du bouton"),
          },
          {
            label: "Appel à l'action (optionnel)",
            description: "Affiché en bas de la page projet, avec un lien vers l'e-mail du site.",
          },
        ),
        links: fields.array(fields.object({ label: loc("Libellé"), url: fields.url({ label: "URL" }) }), {
          label: "Liens",
          itemLabel: (p) => p.fields.label.fields.fr.value || "Lien",
        }),
      },
    }),

    experiences: collection({
      label: "Parcours",
      slugField: "company",
      path: "content/experiences/*",
      format: { data: "yaml" },
      columns: ["company", "order", "status"],
      schema: {
        company: fields.slug({ name: { label: "Structure(s)", validation: { isRequired: true } } }),
        status,
        order,
        title: loc("Poste", { required: true }),
        location: fields.text({ label: "Ville" }),
        period: loc("Période", { required: true }),
        description: loc("Description", { multiline: true }),
      },
    }),

    films: collection({
      label: "Films (Influences)",
      slugField: "title",
      path: "content/films/*",
      format: { data: "yaml" },
      columns: ["title", "order", "status"],
      schema: {
        title: fields.slug({ name: { label: "Titre (FR)", validation: { isRequired: true } } }),
        titleEn: fields.text({ label: "Titre (EN)", description: "Laisser vide si identique." }),
        status,
        order,
        director: fields.text({ label: "Réalisateur" }),
        year: fields.text({ label: "Année" }),
        genre: loc("Genre"),
        poster: image("Affiche", "films"),
        url: fields.url({ label: "Lien (Letterboxd…)" }),
        description: loc("Texte", { multiline: true }),
      },
    }),

    games: collection({
      label: "Jeux vidéo (Influences)",
      slugField: "title",
      path: "content/games/*",
      format: { data: "yaml" },
      columns: ["title", "order", "status"],
      schema: {
        title: fields.slug({ name: { label: "Titre", validation: { isRequired: true } } }),
        status,
        order,
        genre: loc("Genre"),
        logo: image("Logo", "games"),
        url: fields.url({ label: "Lien officiel" }),
        description: loc("Texte", { multiline: true }),
      },
    }),

    pages: collection({
      label: "Pages libres",
      slugField: "slug",
      path: "content/pages/*",
      format: { data: "yaml" },
      columns: ["slug", "status"],
      schema: {
        slug: fields.slug({
          name: { label: "Nom interne" },
          slug: { label: "Adresse (/…)", description: "Ex. « personal-brand » → /personal-brand" },
        }),
        status,
        title: loc("Titre", { required: true }),
        eyebrow: loc("Sur-titre"),
        intro: loc("Introduction", { multiline: true }),
        blocks: fields.array(
          fields.object({
            heading: loc("Intertitre"),
            body: loc("Texte", { multiline: true }),
            links: fields.array(fields.object({ label: loc("Libellé"), url: fields.url({ label: "URL" }) }), {
              label: "Liens (Instagram, chaîne, article…)",
              itemLabel: (p) => p.fields.label.fields.fr.value || "Lien",
            }),
          }),
          {
            label: "Blocs",
            itemLabel: (p) => p.fields.heading.fields.fr.value || "Bloc",
          },
        ),
        seoDescription: loc("Description SEO", { multiline: true }),
      },
    }),
  },
});
