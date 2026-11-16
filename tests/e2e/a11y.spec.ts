import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Accessibilité : règles WCAG 2.1 A/AA (axe) sur les pages types, en desktop et en mobile. */
for (const path of ["/", "/en", "/projets", "/projets/postmeridian", "/projets/pineapple-pie", "/nope"]) {
  test(`axe : aucune violation sur ${path}`, async ({ page }) => {
    await page.route(/i\.ytimg\.com/, (r) => r.abort());
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });
}

test("menu ouvert : axe sans violation, focus piégé dans la feuille", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const results = await new AxeBuilder({ page }).include("dialog").withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    // Le focus reste dans la feuille (ou passe par l'interface du navigateur), jamais dans la page derrière.
    const where = await page.evaluate(() => {
      const el = document.activeElement;
      return !el || el === document.body || Boolean(el.closest("dialog"));
    });
    expect(where).toBe(true);
  }
});

test("clavier : tout élément interactif a un focus visible", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop");
  await page.goto("/projets/pineapple-pie");
  const seen: string[] = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return {
        name: (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 30),
        outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0,
      };
    });
    if (!info) continue;
    seen.push(info.name);
    expect(info.outline, `focus invisible sur « ${info.name} »`).toBe(true);
  }
  expect(seen.length).toBeGreaterThan(8);
});
