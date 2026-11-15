# REVIEW — Refonte du portfolio (branche `redesign/v2`)

> Document de review pour Hugo. Rédigé pendant la session autonome du 15/11/2026, tenu à jour jusqu'au gel.
> Journal détaillé : [PROGRESS.md](PROGRESS.md) · Décisions : [DECISIONS.md](DECISIONS.md) · Audit : [AUDIT.md](AUDIT.md) · Direction artistique : [DESIGN.md](DESIGN.md) · Incohérences : [INCOHERENCES.md](INCOHERENCES.md)

## 1. Résumé en 10 lignes

1. Nouvelle direction artistique **« Carton de générique »** : noir chaud, blanc os, un seul rouge vermillon, typographie d'affiche (Gloock) + texte net (Hanken Grotesk). Fini les cartes carrées bordées et les boutons rouges pleins.
2. Le site se lit comme un générique : sections numérotées façon Criterion, projets en deux niveaux (structures en grand, courts-métrages en filmographie), compétences en « générique de fin », manifeste en carton inversé clair.
3. **Navigation évidente** : barre en haut sur desktop avec section active, **dock en bas de l'écran sur mobile** (zone du pouce) qui ouvre un menu plein écran accessible (Échap, focus, lien d'évitement).
4. **Back-office Keystatic** sur `/keystatic` : tout le contenu (textes FR/EN, projets, parcours, influences, navigation, ordre des sections) est dans `content/` et s'édite sans code.
5. **Masquer / afficher un onglet en un clic** : champ « Statut » partout. Masqué = absent du menu et du sitemap, `noindex`, 404 en production ; visible avec un badge « Masqué » en développement.
6. **Bilingue servi en HTML** : français sur `/`, anglais sur `/en` (avant, l'anglais n'existait qu'après chargement du JS et n'était pas indexable).
7. **Performance** : tout est statique, framer-motion supprimé, animations en CSS, polices auto-hébergées, portrait de 8 Mo remplacé par une source de 300 Ko servie en AVIF.
8. **Motion** : ident 489Productions ≤ 1,2 s une fois par session (passable au clic, désactivable dans le CMS), révélations au scroll en CSS, transitions de page natives, micro-interactions sur la nav et les liens ; tout est coupé si l'utilisateur préfère réduire les animations.
9. **Nettoyage** : démo ASCII « @chenglou/pretext », pluie, grain animé, colonnes de caractères chinois décoratifs supprimés ; 英雄本色 gardé une seule fois, vectorisé, en signature.
10. **SEO** : métadonnées par page, hreflang FR/EN, images Open Graph générées (site + chaque projet), sitemap/robots qui respectent le statut, données structurées `Person`, anciennes URL redirigées.

## 2. Avant / après

|             | Avant                                        | Après                                                                                                       |
| ----------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Screenshots | [`screenshots/before/`](screenshots/before/) | [`screenshots/after/`](screenshots/after/) (+ [`mid/`](screenshots/mid/), [`motion/`](screenshots/motion/)) |

Métriques — _tableau finalisé au gel, voir § 2 bis._

## 3. Comment lancer

```bash
npm i && npm run dev
```

- Site : http://localhost:3000 (anglais : http://localhost:3000/en)
- Back-office : http://localhost:3000/keystatic

Autres commandes : `npm run build` · `npm run lint` · `npm run format:check` · `npm run test:e2e` (après un build) · `npm run test:cms` (avec `npm run dev -- -p 3200` lancé).

## 4. Mode d'emploi du CMS

_Rédigé au gel, voir § 4 final._

## 5. Déploiement

_Rédigé au gel._

## 6. Décisions prises seul

_Voir DECISIONS.md ; top 5 au gel._

## 7. À valider par Hugo

_Au gel._

## 8. Non fait / prochaines étapes

_Au gel._
