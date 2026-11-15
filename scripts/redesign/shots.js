const { chromium } = require("playwright");
const [, , base, outDir, ...paths] = process.argv;
(async () => {
  const b = await chromium.launch();
  for (const w of [375, 768, 1440]) {
    const ctx = await b.newContext({
      viewport: { width: w, height: w === 375 ? 812 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const p = await ctx.newPage();
    for (const path of paths) {
      await p.goto(base + path, { waitUntil: "networkidle" });
      await p.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(800);
      const name = path === "/" ? "home" : path.replace(/\//g, "").replace(/[^a-z0-9-]/gi, "_");
      await p.screenshot({ path: `${outDir}/${name}-${w}.png`, fullPage: true });
      await p.screenshot({ path: `${outDir}/${name}-${w}-fold.png` });
    }
    await ctx.close();
  }
  await b.close();
})();
