import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/**", ".astro/**", ".vercel/**", "_archive/**", ".claude/**", "node_modules/**", "test-results/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["scripts/**", "tests/**", "**/*.cjs"],
    languageOptions: { globals: { require: "readonly", module: "writable", process: "readonly", __dirname: "readonly", console: "readonly", window: "readonly", document: "readonly" } },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
];
