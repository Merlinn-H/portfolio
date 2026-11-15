# Hugo Pezzo — portfolio

Site personnel de Hugo Pezzo (producteur audiovisuel). **Astro 7**, 100 % statique (~5 kB de JavaScript), contenu édité dans **Keystatic**.

## Démarrer

```bash
npm i
npm run dev
```

- Site : http://localhost:4321 — anglais : http://localhost:4321/en
- Back-office : http://localhost:4321/keystatic (en local, les modifications sont écrites dans `content/`)

## Commandes

| Commande                                                  | Rôle                                                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run build`                                           | Build de production (toutes les pages et images générées à l'avance, dans `dist/`)              |
| `npm run preview`                                         | Sert le build sur http://localhost:3100                                                         |
| `npm run lint` / `npm run check` / `npm run format:check` | ESLint / typage Astro / Prettier                                                                |
| `npm run test:e2e`                                        | Tests Playwright (nav, langue, visibilité) — après `npm run build`                              |
| `npm run test:cms`                                        | Parcours CMS créer → voir → supprimer (avec `npx astro dev --port 3200` lancé, URL en argument) |
| `scripts/redesign/visibility-toggle.sh`                   | Teste la bascule Publié/Masqué sur des builds de production                                     |

## Structure

```
content/              contenu (YAML) édité par Keystatic
keystatic.config.ts   schéma du back-office
src/assets/images/    images gérées par le CMS (<collection>/<slug>/<champ>.<ext>), optimisées au build
src/pages/            routes : FR à la racine, EN sous /en, og/ (images de partage), sitemap, robots, 404
src/routes/           pages partagées FR/EN (accueil, projets, projet, page libre)
src/layouts/Base.astro  gabarit (SEO, polices, routeur sans rechargement, nav, ident, footer)
src/components/       ui/, layout/ (nav, footer, ident), sections/ (accueil), project/
src/views/            contenu des pages
src/lib/              content.ts (lecture du contenu au build), i18n.ts, seo.ts, og.ts
src/styles/           tokens.css (design tokens), globals.css
docs/redesign/        audit, direction artistique, décisions, journal, review
```

Documentation de la refonte : [`docs/redesign/REVIEW.md`](docs/redesign/REVIEW.md).
