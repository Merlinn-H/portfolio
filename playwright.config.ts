import { defineConfig, devices } from "@playwright/test";

/**
 * Tests de non-régression (nav + visibilité) contre le build de production.
 * npm run build && npm run test:e2e
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3100",
    reducedMotion: "reduce",
    trace: "off",
  },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run preview", url: "http://localhost:3100", reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
