import { expect, test } from "@playwright/test";

test("le lien d'évitement mène au contenu", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Aller au contenu" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#content$/);
});

test("navigation principale : chaque onglet mène à sa section", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const nav = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  for (const [label, id] of [
    ["Projets", "projects"],
    ["Parcours", "experience"],
    ["Contact", "contact"],
  ]) {
    if (isMobile && !(await nav.isVisible())) await page.getByRole("button", { name: "Menu" }).click();
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("menu mobile : s'ouvre, se ferme avec Échap", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile uniquement");
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(menu).toBeFocused();
});

test("bascule FR / EN conserve la page", async ({ page, isMobile }) => {
  await page.goto("/projets/postmeridian");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const scope = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  await scope.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/projets\/postmeridian$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("les anciennes URL redirigent", async ({ page }) => {
  await page.goto("/489productions");
  await expect(page).toHaveURL(/\/projets\/489productions$/);
  await page.goto("/films");
  await expect(page).toHaveURL(/\/projets$/);
});

test("aucun reste de démo / debug", async ({ page }) => {
  for (const path of ["/", "/en", "/projets"]) {
    await page.goto(path);
    await expect(page.locator("body")).not.toContainText(/pretext|ascii demo|lorem ipsum|TODO/i);
  }
});

test("aucun défilement horizontal à 375 / 768 / 1024 / 1440 px", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/projets/au-coeur-de-l-alienation", "/en/projets/489productions"]) {
      await page.goto(path);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(sw, `${path} @${width}px`).toBeLessThanOrEqual(width);
    }
  }
});

test("EN : les onglets défilent sans recharger la page", async ({ page, isMobile }) => {
  await page.goto("/en");
  await page.evaluate(() => ((window as unknown as { __marker: number }).__marker = 42));
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const scope = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  await scope.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/\/en#experience$/);
  expect(await page.evaluate(() => (window as unknown as { __marker?: number }).__marker)).toBe(42);
});

test("FR ↔ EN sans rechargement : même page, même position, langue mise à jour", async ({ page, isMobile }) => {
  const documents: string[] = [];
  page.on("request", (r) => r.resourceType() === "document" && documents.push(r.url()));
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 2000));
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const scope = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  await scope.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1500);
  expect(documents).toHaveLength(1);
});

test("parcours complet sans rechargement de page, ident jamais rejoué", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop");
  const documents: string[] = [];
  page.on("request", (r) => r.resourceType() === "document" && documents.push(r.url()));
  await page.goto("/projets");
  await page.locator('a[href="/projets/postmeridian"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("POSTMERIDIAN");
  await page.getByRole("banner").getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/projets\/postmeridian$/);
  await page.getByRole("banner").getByRole("link", { name: "Hugo Pezzo" }).click();
  await expect(page).toHaveURL(/\/en$/);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator("[data-intro-overlay][data-play]")).toHaveCount(0);
  expect(documents).toHaveLength(1);
});

test("404 : statut 404, liens de langue valides", async ({ page }) => {
  for (const path of ["/nope", "/en/nope"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    const hrefs = await page
      .getByRole("banner")
      .getByRole("group")
      .getByRole("link")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    for (const h of hrefs) expect(h).toMatch(/^\/(en)?$/);
  }
});

test("aucun préchargement au chargement : l'autre langue n'est chargée qu'à l'intention", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop");
  const fetched: string[] = [];
  page.on("request", (r) => r.resourceType() !== "document" && /\/en$/.test(new URL(r.url()).pathname) && fetched.push(r.url()));
  await page.goto("/");
  await page.waitForTimeout(1500);
  expect(fetched).toHaveLength(0);
  await page.getByRole("banner").getByRole("link", { name: "English" }).hover();
  await expect.poll(() => fetched.length).toBeGreaterThan(0);
});
