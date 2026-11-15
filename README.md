# Hugo Pezzo — portfolio

Site personnel de Hugo Pezzo (producteur audiovisuel). Next.js 16 (App Router, 100 % statique), contenu édité dans **Keystatic**.

## Démarrer

```bash
npm i
npm run dev
```

- Site : http://localhost:3000 — anglais : http://localhost:3000/en
- Back-office : http://localhost:3000/keystatic (en local, les modifications sont écrites dans `content/`)

## Commandes

| Commande                                | Rôle                                                                  |
| --------------------------------------- | --------------------------------------------------------------------- |
| `npm run build`                         | Build de production (génère toutes les pages en statique)             |
| `npm run lint` / `npm run format:check` | ESLint / Prettier                                                     |
| `npm run test:e2e`                      | Tests Playwright (nav, visibilité) — après `npm run build`            |
| `npm run test:cms`                      | Parcours CMS créer → voir → supprimer (avec `npm run dev -- -p 3200`) |
| `scripts/redesign/visibility-toggle.sh` | Teste la bascule Publié/Masqué sur des builds de production           |

## Structure

```
content/          contenu (YAML) édité par Keystatic
keystatic.config.ts  schéma du back-office
public/images/    images gérées par le CMS (<collection>/<slug>/<champ>.<ext>)
src/app/(fr)/     routes françaises (/, /projets, /projets/[slug], /[slug])
src/app/en/       routes anglaises (/en/…)
src/app/keystatic, src/app/api/keystatic   back-office (404 en production en mode local)
src/components/   ui/ (primitives), layout/ (nav, footer, ident), sections/ (accueil), project/
src/views/        pages partagées FR/EN
src/lib/          content.ts (lecture du contenu au build), i18n.ts, seo.ts, og.tsx, fonts.ts
src/styles/       tokens.css (design tokens), globals.css
docs/redesign/    audit, direction artistique, décisions, journal, review
```

Documentation de la refonte : [`docs/redesign/REVIEW.md`](docs/redesign/REVIEW.md).
