// One-shot migration: legacy src/lib/i18n.ts (archived) -> Keystatic YAML in content/.
// Facts are copied verbatim; only structure changes.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import yaml from "js-yaml";

const src = fs.readFileSync("_archive/legacy/i18n.ts", "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText;
const tmp = path.resolve("scripts/redesign/.i18n.tmp.mjs");
fs.writeFileSync(tmp, js);
const { t } = await import(tmp);
fs.unlinkSync(tmp);
const { fr, en } = t;

const L = (a, b) => ({ fr: a ?? "", en: b ?? "" });
const write = (p, data) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, yaml.dump(data, { lineWidth: -1, noRefs: true }));
};
const slug = (s) => s.replace(/œ/g, "oe").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* site */
write("content/site.yaml", {
  name: "Hugo Pezzo",
  url: "https://hugopezzo.fr",
  role: L(fr.hero.label, en.hero.label),
  tagline: L(fr.hero.tagline, en.hero.tagline),
  quote: { text: "All I want is a chance to start over.", source: "A Better Tomorrow, John Woo, 1986", hanzi: "英雄本色" },
  portrait: "/images/site/portrait.jpg",
  portraitAlt: L("Portrait de Hugo Pezzo", "Portrait of Hugo Pezzo"),
  email: "hugopezzo@outlook.com",
  socials: [{ label: "LinkedIn", url: "https://linkedin.com/in/hugo-pezzo" }],
  seoTitle: L("Hugo Pezzo — Producteur audiovisuel", "Hugo Pezzo — Film & game producer"),
  seoDescription: L(
    "Portfolio de Hugo Pezzo, producteur audiovisuel : courts-métrages, 489Productions et le studio de jeu vidéo POSTMERIDIAN.",
    "Portfolio of Hugo Pezzo, audiovisual producer: short films, 489Productions and the video game studio POSTMERIDIAN.",
  ),
  footer: L(fr.footer, en.footer),
});

/* home */
write("content/home.yaml", {
  sections: [
    { type: "hero", eyebrow: L("", ""), title: L("", ""), intro: L("", ""), status: "published" },
    { type: "projects", eyebrow: L(fr.projects.label, en.projects.label), title: L("Projets", "Projects"), intro: L("", ""), status: "published" },
    { type: "manifesto", eyebrow: L(fr.philosophy.label, en.philosophy.label), title: L("", ""), intro: L(fr.philosophy.text, en.philosophy.text), status: "published" },
    { type: "experience", eyebrow: L(fr.experience.label, en.experience.label), title: L(fr.experience.title, en.experience.title), intro: L(fr.experience.summary, en.experience.summary), status: "published" },
    { type: "skills", eyebrow: L(fr.skills.label, en.skills.label), title: L(fr.skills.title, en.skills.title), intro: L("", ""), status: "published" },
    { type: "influences", eyebrow: L(fr.gaming.label, en.gaming.label), title: L("Influences", "Influences"), intro: L("", ""), status: "published" },
    { type: "contact", eyebrow: L(fr.contact.label, en.contact.label), title: L(fr.contact.title, en.contact.title), intro: L(fr.contact.desc, en.contact.desc), status: "published" },
  ],
});

/* navigation */
const sec = (label, section) => ({ label, target: { discriminant: "section", value: section }, status: "published" });
write("content/navigation.yaml", {
  items: [
    sec(L(fr.nav.projects, en.nav.projects), "projects"),
    sec(L(fr.nav.experience, en.nav.experience), "experience"),
    sec(L(fr.nav.skills, en.nav.skills), "skills"),
    sec(L(fr.nav.gaming, en.nav.gaming), "influences"),
    sec(L(fr.nav.contact, en.nav.contact), "contact"),
    { label: L("Personal brand", "Personal brand"), target: { discriminant: "page", value: "personal-brand" }, status: "hidden" },
  ],
});

/* skills */
write("content/skills.yaml", {
  categories: fr.skills.categories.map((c, i) => ({
    name: L(c.category, en.skills.categories[i].category),
    items: c.skills.map((s, j) => L(s, en.skills.categories[i].skills[j])),
  })),
});

/* experiences */
fr.experience.items.forEach((x, i) => {
  const y = en.experience.items[i];
  const [company, location] = x.company.split(" — ");
  write(`content/experiences/${slug(company.split(" ")[0])}.yaml`, {
    company,
    status: "published", order: (i + 1) * 10,
    title: L(x.title, y.title), location: location ?? "",
    period: L(x.period, y.period), description: L(x.description, y.description),
  });
});
write("content/experiences/djogo.yaml", {
  company: "Djogo",
  status: "hidden", order: 0,
  title: L("Créateur de contenus / Responsable communication", "Content creator / Head of communications"),
  location: "Lyon",
  period: L("Depuis fin août 2026", "Since late August 2026"),
  description: L("", ""),
});

/* projects */
const pf = fr.productions_page, pe = en.productions_page;
write("content/projects/489productions.yaml", {
  title: "489Productions",
  status: "published", order: 10, category: "production",
  kicker: L(fr.projects.productions.label, en.projects.productions.label),
  year: "2023", role: L(fr.experience.items[1].title, en.experience.items[1].title),
  summary: L(fr.projects.productions.desc, en.projects.productions.desc),
  body: L(pf.about, pe.about),
  tagline: L("Vision. Production. Action!", "Vision. Production. Action!"),
  cover: null, coverAlt: L("", ""), logo: "/images/projects/489productions.png", gallery: [], youtubeId: "",
  highlights: pf.services.map((s, i) => ({ title: L(s.title, pe.services[i].title), text: L(s.description, pe.services[i].description) })),
  links: [],
});
write("content/projects/postmeridian.yaml", {
  title: "POSTMERIDIAN",
  status: "published", order: 20, category: "studio",
  kicker: L(fr.projects.postmeridian.label, en.projects.postmeridian.label),
  year: "2024", role: L(fr.experience.items[0].title, en.experience.items[0].title),
  summary: L(fr.projects.postmeridian.desc, en.projects.postmeridian.desc),
  body: L(fr.experience.items[0].description, en.experience.items[0].description),
  tagline: L("", ""), cover: null, coverAlt: L("", ""), logo: "/images/projects/postmeridian.png", gallery: [], youtubeId: "",
  highlights: [],
  links: [{ label: L("postmeridian.co", "postmeridian.co"), url: "https://www.postmeridian.co" }],
});
fr.films_page.films.forEach((f, i) => {
  const g = en.films_page.films[i];
  write(`content/projects/${slug(f.title)}.yaml`, {
    title: f.title,
    status: "published", order: 30 + i * 10, category: "short",
    kicker: L("Court-métrage", "Short film"),
    year: f.year, role: L(f.roles.join(", "), g.roles.join(", ")),
    summary: L(f.description[0], g.description[0]),
    body: L(f.description.join("\n\n"), g.description.join("\n\n")),
    tagline: L("", ""), cover: null, coverAlt: L("", ""), logo: null, gallery: [], youtubeId: f.youtubeId,
    highlights: [], links: [],
  });
});

/* influences */
fr.gaming.films.forEach((f, i) => {
  const g = en.gaming.films[i];
  write(`content/films/${slug(f.title)}.yaml`, {
    title: f.title,
    titleEn: g.title === f.title ? "" : g.title, status: "published", order: (i + 1) * 10,
    director: f.director, year: f.year, genre: L(f.genre, g.genre),
    poster: f.poster.replace("/films/", "/images/films/"), url: f.url,
    description: L(f.description, g.description),
  });
});
fr.gaming.games.forEach((f, i) => {
  const g = en.gaming.games[i];
  write(`content/games/${slug(f.title)}.yaml`, {
    title: f.title,
    status: "published", order: (i + 1) * 10, genre: L(f.genre, g.genre),
    logo: f.logo.replace("/games/", "/images/games/"), url: f.url,
    description: L(f.description, g.description),
  });
});

/* pages */
const TODO = "[À RÉDIGER]";
write("content/pages/personal-brand.yaml", {
  slug: "Personal brand",
  status: "hidden",
  title: L("Personal brand", "Personal brand"),
  eyebrow: L(TODO, TODO),
  intro: L(`${TODO} Introduction / positionnement en 2–3 phrases.`, `${TODO} Intro / positioning in 2–3 sentences.`),
  blocks: [
    { heading: L("Manifeste", "Manifesto"), body: L(`${TODO} Ce que je défends, pourquoi je produis.`, `${TODO} What I stand for, why I produce.`) },
    { heading: L("Contenus", "Content"), body: L(`${TODO} Formats publiés, thèmes, fréquence.`, `${TODO} Formats, topics, cadence.`) },
    { heading: L("Réseaux", "Channels"), body: L(`${TODO} Liens vers les réseaux et ce qu'on y trouve.`, `${TODO} Links to channels and what's there.`) },
    { heading: L("Contact", "Contact"), body: L(`${TODO} Pour quelles demandes me contacter.`, `${TODO} What to reach out about.`) },
  ],
  seoDescription: L(TODO, TODO),
});
console.log("ok");
