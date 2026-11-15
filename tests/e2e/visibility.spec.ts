import { expect, test } from "@playwright/test";

/**
 * Visibilité des onglets en production.
 * Par défaut la page « personal-brand » et l'expérience « Djogo » sont masquées.
 * EXPECT_PERSONAL_BRAND=published inverse l'attente (voir scripts/redesign/visibility-toggle.sh).
 */
const published = process.env.EXPECT_PERSONAL_BRAND === "published";

test("page masquée : 404, hors nav, hors sitemap — ou l'inverse une fois publiée", async ({ page, request }) => {
  const res = await request.get("/personal-brand");
  expect(res.status()).toBe(published ? 200 : 404);
  expect((await request.get("/en/personal-brand")).status()).toBe(published ? 200 : 404);

  await page.goto("/");
  const links = page.getByRole("banner").locator("a").or(page.locator("dialog a"));
  await expect(links.filter({ hasText: "Personal brand" })).toHaveCount(published ? 2 : 0);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.includes("/personal-brand")).toBe(published);
});

test("une page masquée n'est jamais indexable", async ({ request }) => {
  test.skip(!published, "vérifié seulement quand la page est publiée");
  const html = await (await request.get("/personal-brand")).text();
  expect(html).not.toContain('content="noindex');
});

test("entrée masquée absente du site (Djogo) et aucun badge « Masqué » en prod", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText("Djogo");
  await expect(page.locator("body")).not.toContainText("Masqué");
});

const noGames = process.env.EXPECT_NO_GAMES === "1";

test("rubrique Jeux vidéo affichée seulement si elle contient des jeux", async ({ page }) => {
  await page.goto("/");
  const games = page.locator("#influences").getByRole("heading", { name: /Jeux vidéo/ });
  await expect(games).toHaveCount(noGames ? 0 : 1);
});

test("barre desktop sur une seule ligne à 1024 px, quel que soit le nombre d'onglets", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop uniquement");
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/");
  const tops = await page
    .locator("header nav li")
    .evaluateAll((els) =>
      els.filter((e) => (e as HTMLElement).offsetParent).map((e) => Math.round(e.getBoundingClientRect().top)),
    );
  expect(new Set(tops).size).toBeLessThanOrEqual(1);
  const right = await page
    .getByRole("banner")
    .evaluate((h) => Math.max(...[...h.querySelectorAll("*")].map((e) => e.getBoundingClientRect().right)));
  expect(right).toBeLessThanOrEqual(1024);
});
