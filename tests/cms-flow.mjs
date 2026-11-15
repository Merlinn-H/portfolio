// Parcours CMS de bout en bout (dev server sur :3200) : créer un projet, vérifier le site, le supprimer.
// usage: node tests/cms-flow.mjs [baseUrl]
import { chromium } from "@playwright/test";
import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:3200";
const t0 = Date.now();
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1300, height: 1000 } });
const step = (m) => console.log(`${((Date.now() - t0) / 1000).toFixed(1)}s  ${m}`);

await p.goto(`${base}/keystatic/collection/projects/create`, { waitUntil: "networkidle" });
step("formulaire ouvert");
await p.getByRole("textbox", { name: "Titre" }).first().fill("Projet Test CMS");
await p
  .getByRole("group", { name: /Étiquette/ })
  .getByRole("textbox", { name: "Français" })
  .fill("Test");
await p
  .getByRole("group", { name: /Résumé/ })
  .getByRole("textbox", { name: "Français" })
  .fill("Projet créé par le test automatique.");
await p.getByRole("textbox", { name: "Ordre" }).fill("99");
await p.getByRole("button", { name: "Create" }).click();
await p.waitForURL(/item\/projet-test-cms/);
const slug = new URL(p.url()).pathname.split("/").pop();
const file = `content/projects/${slug}.yaml`;
step(`projet enregistré (${file})`);
if (!fs.existsSync(file)) throw new Error("fichier non créé");

const res = await p.goto(`${base}/projets/${slug}`, { waitUntil: "domcontentloaded" });
if (res.status() !== 200) throw new Error(`page projet: ${res.status()}`);
await p.goto(`${base}/`, { waitUntil: "domcontentloaded" });
if (!(await p.getByRole("heading", { name: "Projet Test CMS" }).count())) throw new Error("absent de l'accueil");
step("visible sur le site (page projet + accueil)");

await p.goto(`${base}/keystatic/collection/projects/item/${slug}`, { waitUntil: "networkidle" });
await p.getByRole("button", { name: "Delete entry…" }).click();
await p.getByRole("button", { name: "Yes, delete" }).click();
await p.waitForURL(/collection\/projects$/);
step("projet supprimé");
if (fs.existsSync(file)) throw new Error("fichier non supprimé");
await b.close();
console.log(`OK — parcours complet en ${((Date.now() - t0) / 1000).toFixed(1)} s (robot)`);
