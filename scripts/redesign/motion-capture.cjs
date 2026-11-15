// Captures the motion design (intro ident, scroll reveals, view transitions) with motion enabled.
// Usage: node scripts/redesign/motion-capture.cjs http://localhost:3100 docs/redesign/screenshots/motion
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = (process.argv[2] || 'http://localhost:3100').replace(/\/$/, '');
const out = process.argv[3] || 'docs/redesign/screenshots/motion';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const VIEWPORTS = [{ width: 375, height: 812 }, { width: 1440, height: 900 }];

async function overlayVisible(page) {
  try {
    const loc = page.locator('[data-intro-overlay]').first();
    if ((await loc.count()) === 0) return false;
    return await loc.evaluate((el) => {
      const s = getComputedStyle(el);
      return s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0;
    });
  } catch { return false; }
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const w = vp.width;
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    const report = { viewport: w, overlayVisible: {}, notes: [] };
    // The very first frame can fail while no document is committed yet: retry briefly.
    const shot = async (name) => {
      for (let i = 0; ; i++) {
        try { return await page.screenshot({ path: path.join(out, name), animations: 'allow' }); }
        catch (e) { if (i >= 20) throw e; await sleep(25); }
      }
    };

    // 1. intro: start navigation without awaiting load, sample on a 100 ms grid
    const t0 = Date.now();
    const nav = page.goto(base + '/', { waitUntil: 'commit' }).catch(() => {});
    for (let ms = 0; ms <= 1500; ms += 100) {
      const wait = t0 + ms - Date.now();
      if (wait > 0) await sleep(wait);
      if (ms === 0) report.firstShotActualMs = Date.now() - t0;
      const probe = [0, 600, 1300].includes(ms) ? await overlayVisible(page) : null;
      await shot(`intro-${w}-${ms}.png`).catch((e) => report.notes.push(`shot ${ms}: ${e.message}`));
      if (probe !== null) report.overlayVisible[ms] = probe;
    }
    await nav;
    await page.waitForLoadState('load');

    // 2. reload in the same context: ident must not replay
    const r0 = Date.now();
    const rl = page.reload({ waitUntil: 'commit' }).catch(() => {});
    for (const ms of [0, 300]) {
      const wait = r0 + ms - Date.now();
      if (wait > 0) await sleep(wait);
      if (ms === 0) report.overlayVisibleAfterReload0ms = await overlayVisible(page);
      await shot(`intro-repeat-${w}-${ms}.png`).catch(() => {});
    }
    await rl;
    await page.waitForLoadState('load');
    report.introOffAfterReload = await page.evaluate(() => document.documentElement.dataset.intro === 'off');
    report.overlayVisibleAfterReload300ms = await overlayVisible(page);

    // 3. scroll
    await sleep(500);
    let step = 0, y = 0;
    while (true) {
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      if (y >= h - vp.height) break;
      y += 300; step++;
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await sleep(120);
      if (step % 3 === 0) await shot(`scroll-${w}-${step}.png`);
    }
    report.scrollSteps = step;
    report.hiddenAfterScroll = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 20 || r.height < 10) return;
        if (parseFloat(getComputedStyle(el).opacity) === 0 && el.textContent.trim() && !el.closest('[data-intro-overlay]'))
          bad.push((el.tagName + '.' + String(el.className).slice(0, 40)).slice(0, 70));
      });
      return bad.slice(0, 15);
    });

    // 4. view transition
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    const link = page.locator('a[href*="/projets/"]').first();
    if (await link.count()) {
      await link.scrollIntoViewIfNeeded();
      await sleep(300);
      const c0 = Date.now();
      const click = link.click().catch((e) => report.notes.push('click: ' + e.message));
      for (const ms of [0, 150, 300, 600]) {
        const wait = c0 + ms - Date.now();
        if (wait > 0) await sleep(wait);
        await shot(`transition-${w}-${ms}.png`).catch(() => {});
      }
      await click;
      await page.waitForLoadState('load').catch(() => {});
      report.afterClickUrl = page.url();
    } else report.notes.push('no /projets/ link found');

    fs.writeFileSync(path.join(out, `motion-report-${w}.json`), JSON.stringify(report, null, 2));
    console.log(w, JSON.stringify(report));
    await ctx.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
