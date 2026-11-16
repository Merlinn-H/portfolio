// Génère les PDF du CV (FR + EN) à partir des pages /cv et /en/cv du build.
// usage : npm run build && npm run cv   (lance un serveur de prévisualisation le temps de l'export)
const { chromium } = require("@playwright/test");
const { spawn } = require("node:child_process");
const fs = require("node:fs");

(async () => {
  const base = process.argv[2] || "http://localhost:3100";
  let server = null;
  const up = async () => {
    try {
      return (await fetch(base + "/cv")).ok;
    } catch {
      return false;
    }
  };
  if (!(await up())) {
    server = spawn("npx", ["astro", "preview", "--port", "3100"], { stdio: "ignore" });
    for (let i = 0; i < 40 && !(await up()); i++) await new Promise((r) => setTimeout(r, 500));
  }
  fs.mkdirSync("public/cv", { recursive: true });
  const browser = await chromium.launch();
  for (const [locale, path] of [
    ["fr", "/cv"],
    ["en", "/en/cv"],
  ]) {
    const page = await browser.newPage();
    await page.emulateMedia({ media: "print" });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const out = `public/cv/hugo-pezzo-cv-${locale}.pdf`;
    await page.pdf({ path: out, format: "A4", printBackground: false, preferCSSPageSize: true });
    console.log("écrit", out);
    await page.close();
  }
  await browser.close();
  if (server) server.kill();
})();
