# AUDIT — état au tag `pre-redesign` (a821386)

## 1. Stack
- Next.js 16.1.6 (App Router, Turbopack), React 19.2, TypeScript strict, Tailwind v4, framer-motion 12, `@chenglou/pretext` 0.0.3.
- 3 routes, toutes `"use client"` : `/`, `/489productions`, `/films`. ~2 300 lignes.
- Aucune base de données, aucune API. Tout le contenu est en dur dans `src/lib/i18n.ts` (FR/EN, 370 lignes).
- Langue choisie côté client (`localStorage`) → le HTML statique est toujours FR, l'EN apparaît après hydratation (flash + EN non indexable).

## 2. Inventaire des assets (`public/`)
| Fichier | Taille | Dimensions | Usage | Verdict |
|---|---|---|---|---|
| photo.jpg | **8,1 Mo** | 7501×7141 | Portrait hero (LCP) | Garder, recadrer/compresser une source raisonnable (2000 px) |
| alternate-logo.png | 28 Ko | 1169×397 | Logo 489 horizontal (nav) | Garder |
| logo-489.png | 39 Ko | 1016×535 | Logo 489 dragon (filigrane) | Garder |
| postmeridian.png | 160 Ko | 3010×2862 | Logo POSTMERIDIAN | Garder |
| films/*.jpg (7) | 53–323 Ko | 1000×1500 | Affiches Influences | Garder |
| games/*.png (4) | 70–881 Ko | variées | Logos jeux Influences | Garder |
| file/globe/next/vercel/window.svg | <2 Ko | — | Restes du template create-next-app, non utilisés | → `_archive/assets/` |

Pas de logo personnel « Hugo Pezzo » : seuls existent les logos 489Productions (dragon, raster) et POSTMERIDIAN (raster).

## 3. Problèmes constatés

### Visibles / amateur
- **Libellé de démo « @chenglou/pretext ascii demo »** affiché sous le dragon ASCII (`PretextManifesto.tsx:200`) + composant canvas animé en boucle permanente.
- **Chevauchement nav desktop (1440 px)** : « HUGO PEZZO » centré en absolu recouvre « PROJETS » (voir `screenshots/before/home-1440-fold.png`).
- « Contact » est marqué actif en haut de page (IntersectionObserver mal calibré).
- Tout est cubique : cartes rectangulaires bordées 1 px, boutons rectangulaires pleins rouges, grille 3 colonnes de services identiques, encadré décalé autour de la photo.
- Caractères chinois plaqués en colonnes décoratives sur les bords du hero (illisibles, ~7 % d'opacité), pluie ambrée, grain canvas animé : empilement d'effets sans hiérarchie.
- Une seule police (Open Sans) pour tout, + Geist chargée mais inutilisée → aucun caractère typographique.
- Citation attribuée « Wong Kar-wai » dans un commentaire alors qu'elle est de John Woo (commentaire seulement, pas visible).
- Pages `/489productions` et `/films` : bouton « ← Retour » au lieu d'une navigation claire.
- Couleurs en dur partout (`#d30000`, `#f5f5f0`, `#080808`, `rgba(...)`), pas de tokens, valeurs magiques.

### Performance (Lighthouse mobile, build local)
| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT | JS transféré |
|---|---|---|---|---|---|---|---|---|
| `/` | 90 | 92 | 100 | 100 | 3,5 s | 0 | 50 ms | 192 Ko |
| `/films` | 90 | 95 | 100 | 100 | 3,6 s | 0 | 70 ms | ~244 Ko |
- Toutes les pages sont client-side + framer-motion partout → JS lourd, contenu animé depuis `opacity:0` (LCP retardé).
- Portrait source de 8 Mo (Next le redimensionne, mais coût de build/cache).
- Grain canvas en `requestAnimationFrame` permanent, dragon ASCII aussi → batterie/CPU mobile.

### Accessibilité
- Pas de lien d'évitement, pas de `<header>`/`<footer>` landmarks cohérents, `<main>` contient la nav.
- Menu mobile : pas de piège de focus, pas d'Échap, bouton hamburger en haut à gauche (loin du pouce).
- Films : `div` cliquable (non accessible au clavier) pour ouvrir la vidéo ; iframe YouTube chargée en modal sans gestion du focus.
- Contrastes insuffisants (texte à 20–30 % d'opacité sur noir).

### SEO
- Métadonnées uniques globales (pas par page), pas d'Open Graph, pas de sitemap/robots, pas de données structurées, EN jamais servi en HTML.

### Code
- Composant `Productions.tsx` mort (non importé). `ProgressBar`, `FilmStrip`, `StaticGrain`, `Grain` : effets décoratifs.
- `@chenglou/pretext` en dépendance mais non importé (seul le commentaire le cite).
- Duplication nav desktop/mobile, Navbar importée dans chaque page au lieu du layout.

## 4. Contenu (source de vérité à préserver)
- 4 expériences, 4 catégories de compétences, 3 projets (489Productions, POSTMERIDIAN, Courts-métrages), 3 courts-métrages avec YouTube, 3 services 489, 7 films + 4 jeux (Influences), texte « Philosophie », contact (hugopezzo@outlook.com, LinkedIn).
- Le brief dit « l'onglet Jeux vidéo est vide » : dans le code, l'onglet Influences › Jeux vidéo contient **4 jeux**. Je conserve ces 4 jeux et applique la règle « un onglet vide est masqué automatiquement » (voir DECISIONS).

## 5. Incohérences relevées (non corrigées — à valider par Hugo)
Listées dans REVIEW.md § 7.

## 6. Priorités
1. Re-plateformer : contenu → Keystatic (YAML/MDoc), pages en Server Components SSG, routes localisées `/` (FR) et `/en` pour un HTML indexable dans les deux langues.
2. Navigation : vraies pages par onglet (Projets, Parcours, Influences, Contact + pages libres) pilotées par le singleton `navigation` avec statut published/hidden ; menu mobile bas d'écran.
3. Design system : tokens CSS, 2 familles typo, composition éditoriale.
4. Perf : zéro framer-motion côté critique, motion en CSS + IntersectionObserver minimal, image hero AVIF priority.
5. Nettoyage : supprimer démo ASCII, effets canvas, composants morts.
