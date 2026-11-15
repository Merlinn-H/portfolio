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
