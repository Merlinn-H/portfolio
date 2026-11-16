const { chromium } = require("playwright");
const [, , base, outDir, ...paths] = process.argv;
(async () => {
  const b = await chromium.launch();
  for (const w of (process.env.WIDTHS || "375,768,1440").split(",").map(Number)) {
    const ctx = await b.newContext({
      viewport: { width: w, height: w === 375 ? 812 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const p = await ctx.newPage();
    // FAKE_YT=<image> : remplace les vignettes YouTube par une image locale (YouTube est bloqué dans certains environnements).
    if (process.env.FAKE_YT)
      await p.route(/i\.ytimg\.com/, (r) => r.fulfill({ path: process.env.FAKE_YT, contentType: "image/jpeg" }));
    else await p.route(/i\.ytimg\.com/, (r) => r.abort());
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
