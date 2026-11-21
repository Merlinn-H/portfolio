# DESIGN — Direction artistique

> **Mise à jour du 21/11 (pages secondaires)** : titres de page à `--step-5` avec interligne 1 (les jambages d'Open Sans ne touchent plus le filet) ; « Projet suivant » à `--step-4`, flèche toujours collée au dernier mot. Vignette de court-métrage : carton de secours (bande de clap + titre) sous l'image, visible si la miniature YouTube manque.

> **Mise à jour du 21/11 (choix des éléments)** : dans Parcours, un poste dont la structure a aussi une page projet (POSTMERIDIAN, 489Productions) renvoie vers cette page au lieu de répéter sa description (le CV garde les descriptions). La citation 英雄本色 quitte le hero et ouvre la section Influences. Portrait en bandeau pleine largeur sur mobile. Influences : 4 films affichés (Time and Tide, Perfect Days et Le Cercle rouge passés en « Masqué » dans le CMS, réversible), sans défilement quand ils tiennent à l'écran.

> **Mise à jour du 21/11 (grille et rythme)** : une seule grille pour toutes les sections au-delà de 1024 px — libellés (dates, rôles, catégories, titres de jeux) en colonnes 1–3, texte à partir de la colonne 4. Toutes les sections ont le même espacement vertical (`--space-8` mobile, `--space-9` desktop ; la bande claire `--space-9` / `--space-10`). Hiérarchie : nom du hero > titres de section (`--step-4`) > noms de projets et postes (`--step-3`). Cibles tactiles ≥ 48 px partout.

> **Mise à jour du 19/11 (clap)** : l'ident au logo 489 est remplacé par un clap de tournage (`src/components/layout/Intro.astro`) : ardoise « Prod. Hugo Pezzo · Scène 489 · Prise 01 · date du jour », le clap se ferme à 540 ms avec secousse, éclats rouges et flash, coupe à ~1,25 s. Une fois par session, passable au clic ou au clavier, jamais avec « réduire les animations ».

> **Mise à jour du 19/11 (charte 489Productions)** : polices → Open Sans seule (gras 700 pour les titres, 400 texte, 600 capitales espacées) ; palette → noir `#121212` et blanc cassé `#f2f0ec` (au lieu du noir et du blanc purs de la charte), rouge charte `#c91517` pour les grands éléments, `#f0544b` pour le petit texte rouge sur fond sombre ; l'ambre disparaît. Sous le nom du hero, filet + capitales très espacées, comme « P R O D U C T I O N S » sous le logo.

> **Mise à jour du 19/11 (nettoyage)** : retirés — numéros et sur-titres de section (« 01 —— Portfolio »), repères de viseur, grain, halo de fond, indicateur « Défiler », carton « Fin ». L'ambre est réservé aux années des courts-métrages. Textes réécrits sans formules creuses ; rôles FR en casse de phrase ; espaces insécables françaises appliquées automatiquement par `pick()`.

> **Mise à jour du 16/11 (session 5)** : polices → Fraunces (titres, + italique pour les titres de films), Archivo (texte), Archivo étroitisé (crédits) ; palette → vermillon pour l'action, ambre pour les repères ; motifs → repères de viseur, carton « Fin ». Les valeurs à jour sont dans `src/styles/tokens.css` ; le détail et les raisons dans DECISIONS.md 46–50. Le reste de ce document (règles de composition, interdits) reste valable.

> Statut : **verrouillé** après le checkpoint Fable 2 (03:45).

## Direction retenue (5 lignes)

1. **« Carton de générique »** : le site se lit comme le générique d'un film — noir chaud, blanc os, un seul rouge vermillon.
2. La typographie _est_ l'image : **Gloock** (serif d'affiche, très contrastée) en très grand pour les titres, **Hanken Grotesk** pour le texte et les crédits en petites capitales.
3. Cadres de cinéma **rectilignes, plein cadre, sans bordure** (letterbox, photogrammes) ; une seule forme courbe dans tout le site : la **pilule** (barre de nav, boutons, badges).
4. Projets en **liste éditoriale numérotée** façon Criterion ; courts-métrages en **title cards** typographiques (aucune vignette disponible) ; Influences comme une cinémathèque.
5. Signature unique : **英雄本色** en vertical, vectorisé en SVG, rouge, une fois. Ident 489Productions au chargement (≤ 1,2 s, une fois par session), puis coupe franche sur le nom.

## Inspirations — ce que j'en retiens concrètement

(Le réseau de la session ne permet pas d'ouvrir ces sites : notes tirées de leur connaissance préalable, pas d'une visite ce matin.)

| Référence                                | Ce que je retiens                                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **rauno.me**                             | Retenue absolue, micro-interactions précises (hover qui révèle une seule info), rien ne bouge sans raison.             |
| **paco.me**                              | Liste éditoriale plutôt que grille : chaque projet est une ligne typographique avec l'année et le rôle en marge.       |
| **dennissnellenberg.com**                | Grande typographie, bouton magnétique, transitions de page en rideau, image qui suit le curseur au survol d'une liste. |
| **lynnandtonic.com**                     | La personnalité passe par un détail signature, pas par la surcharge.                                                   |
| **darkroom.engineering / locomotive.ca** | Rythme vertical, sections pleine hauteur, révélations au scroll avec masques (clip-path) plutôt que fondus.            |
| **A24**                                  | Noir/blanc presque brutal, la typographie _est_ l'image, peu de couleur.                                               |
| **MUBI**                                 | Une seule affiche par écran, éditorialisée (citation, réalisateur, année) — format « carte de cinémathèque ».          |
| **Criterion**                            | Numérotation des titres (« No. 01 »), cartons de générique, sérieux du catalogue.                                      |

## Trois directions

### A — « Carton de générique » (recommandée)

Noir chaud, blanc os, un seul rouge vermillon. Une serif d'affiche très grande (Instrument Serif, regular + italique) pour les titres, une grotesque nette pour le texte (Hanken Grotesk). Le site se lit comme un générique : cartons pleine largeur, numérotation façon Criterion, crédits en petites capitales espacées. Le hero est un plan en letterbox (bandes noires qui s'ouvrent), le portrait est cadré comme un photogramme 4:5 avec un masque arrondi doux. Signature : 英雄本色 en vertical, une seule fois, en rouge, comme le tampon d'un titre original. Projets en liste éditoriale (grands titres, année/rôle en marge, image qui apparaît au survol sur desktop), courts-métrages en « title cards ».

- Risque : peut sembler austère si le rythme est raté → compenser par l'échelle typographique et le motion.

### B — « Kowloon la nuit »

Encre bleu-noir, rouge néon et halo cyan, grotesque condensée (type Anton) en capitales, effets de lueur, glitch de projection au chargement.

- Risque : kitsch rapidement, effets coûteux en perf, se rapproche du « plaqué » qu'on veut quitter.

### C — « Papier A24 »

Fond papier blanc chaud, typographie noire, rouge en accent minimal, mise en page de catalogue imprimé.

- Risque : perd l'identité HK et la dimension « salle de cinéma » ; le portrait et les affiches sombres jurent sur fond clair.

## Tokens (direction A)

### Couleurs

| Token          | Valeur                    | Usage                                                                             | Contraste sur `--bg` |
| -------------- | ------------------------- | --------------------------------------------------------------------------------- | -------------------- |
| `--bg`         | `#0e0c0a`                 | Fond (noir chaud)                                                                 | —                    |
| `--bg-raised`  | `#171411`                 | Surfaces (menu mobile, modale)                                                    | —                    |
| `--fg`         | `#ede6d9`                 | Texte principal (blanc os)                                                        | 15,7:1               |
| `--fg-muted`   | `#a39d93`                 | Texte secondaire                                                                  | 7,3:1                |
| `--fg-subtle`  | `#8a847b`                 | Métadonnées, crédits                                                              | 5,3:1                |
| `--line`       | `rgb(237 230 217 / 0.14)` | Filets                                                                            | décoratif            |
| `--accent`     | `#ef4130`                 | Vermillon (dérivé du rouge historique `#d30000`, éclairci pour passer AA : 5,1:1) | 5,1:1                |
| `--accent-ink` | `#0e0c0a`                 | Texte sur fond accent                                                             | 5,1:1                |

Le rouge historique `#d30000` ne fait que 3,5:1 sur noir → refusé pour du texte.

### Typographie

- Display : **Gloock** 400 (une seule graisse, pas d'italique synthétique), `next/font/google`, preload, `display: swap`, subset latin. Instrument Serif écartée (serif « template » du moment), comparatif rendu sur les vrais noms : Gloock a le plus de caractère et tient « POSTMERIDIAN » / « Au Cœur de l'Aliénation ».
- Texte : **Hanken Grotesk** 400 / 600, `display: swap`, pas de preload.
- Pas de webfont CJK : 英雄本色 est vectorisé en SVG inline depuis Noto Serif TC (OFL), `lang="zh-Hant"`, texte accessible.
- Échelle fluide (`clamp`) : `--step--1` 0,833rem → `--step-0` 1rem → `--step-1` 1,25 → `--step-2` 1,6 → `--step-3` 2,2 → `--step-4` 3,2 → `--step-5` 4,8 → `--step-6` 7,5rem (titres affiche).
- Crédits : petites capitales via `text-transform: uppercase`, `letter-spacing: 0.18em`, `--step--1`.

### Espacements

Échelle unique (rem) : `--space-1` 0,25 · `--space-2` 0,5 · `--space-3` 0,75 · `--space-4` 1 · `--space-5` 1,5 · `--space-6` 2 · `--space-7` 3 · `--space-8` 4 · `--space-9` 6 · `--space-10` 8 · `--space-11` 12. Gouttière de page : `clamp(1rem, 4vw, 3rem)`. Rien en dehors de cette échelle.

### Rayons

`--radius-pill` 999px (nav, boutons, badges) — **seule forme courbe**. Images et cadres : angles droits (`0`), plein cadre, sans bordure.

### Motion

- Courbes : `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) · `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)`.
- Durées : `--dur-1` 150 ms (hover) · `--dur-2` 300 ms (UI) · `--dur-3` 600 ms (révélations) · `--dur-4` 1000 ms (intro, total ≤ 1,2 s).
- `prefers-reduced-motion: reduce` → toutes les durées à ~0, aucune translation, intro sautée.

## Navigation (spécification)

- **Source** : singleton `navigation` (3 à 8 onglets). Chaque onglet = libellé FR/EN + destination (section de l'accueil, liste des projets, page libre, lien externe) + statut.
- **Desktop (≥ 1024 px)** : barre fixe en haut, transparente sur le hero puis pilule flottante sur fond `--bg-raised` au scroll. À gauche : nom « Hugo Pezzo » (lien accueil). Au centre/droite : onglets en Hanken 600 `--step--1`, capitales espacées. À droite : bascule de langue `FR / EN` (deux liens, la langue courante soulignée en `--accent`).
- **Actif** : sur l'accueil, l'onglet de la section qui occupe le milieu de l'écran ; aucun actif tant que le hero est visible. Sur une page, l'onglet dont l'URL correspond. Marqueur = point vermillon + texte `--fg`, inactif = `--fg-muted`.
- **Tablette / mobile (< 1024 px)** : pilule fixe **en bas de l'écran** (zone du pouce) avec le nom à gauche et un bouton « Menu » à droite. Le menu ouvre une feuille plein écran depuis le bas : onglets en Gloock `--step-4`, un par ligne, numérotés, cibles ≥ 56 px ; langue et contact en bas. Échap / bouton Fermer, focus piégé, scroll verrouillé.
- **6 onglets** : mode « Menu » entre 1024 et 1280 px ; **au-delà de 6**, mode « Menu » sur tout le desktop (jamais de nav sur deux lignes ni de débordement — test Playwright à 1024 px).
- **Badge « Masqué »** : en développement uniquement, pilule `--accent` « MASQUÉ » à côté de l'onglet, et bandeau en haut d'une page masquée.
- **Lien d'évitement** « Aller au contenu » en premier élément focusable.

## Règles de composition

1. Grille 12 colonnes desktop, 6 tablette, 4 mobile ; on **casse** la grille volontairement (titres qui débordent, texte décalé de 2 colonnes).
2. Un écran = une idée. Sections séparées par de l'espace (`--space-10`/`--space-11`), pas par des bordures.
3. Les titres de section sont des « cartons » : numéro façon Criterion (`01`), sur-titre en crédits, titre en serif très grande.
4. Images : photogramme rectiligne, sans bordure ni cadre décalé ; le portrait (fond très clair) est passé en noir et blanc légèrement assombri pour ne pas devenir l'élément le plus lumineux de la page.
5. Le rouge est rare : focus, liens actifs, un mot-clé, la signature 英雄本色. Jamais d'aplat rouge sur une grande surface.

## Interdits

- Pas de cartes carrées bordées en grille 3×N ; pas de bordure 1 px autour de chaque bloc ; pas de `border-radius` sur les images (la pilule est la seule courbe).
- Pas de boutons rectangulaires pleins rouges ; les CTA sont des liens typographiques ou des pilules.
- Pas de caractères chinois décoratifs en colonnes ; pas de nouveaux caractères inventés.
- Pas d'effet canvas en boucle (pluie, grain animé, ASCII) ; grain = SVG statique en CSS, opacité ≤ 6 %.
- Pas de couleur en dur dans les composants : uniquement des tokens.
- Pas de texte sous 4,5:1 de contraste.
- Pas d'animation qui démarre à `opacity: 0` sur le contenu du LCP.
