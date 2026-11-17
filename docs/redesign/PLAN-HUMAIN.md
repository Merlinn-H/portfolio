# PLAN — Rendre le site « humain » (brief d'implémentation pour Opus)

> Rédigé le 17/11/2026 à la demande de Hugo : « je trouve ça trop "Claude" niveau visuel ».
> Ce document est autonome : tu peux partir de lui seul. Contexte complet si besoin : `REVIEW.md`, `DECISIONS.md`, `DESIGN.md` (même dossier).

## 0. Mission en trois lignes

Le site est techniquement fini (Astro 7, Keystatic, 48 tests, Lighthouse 99/100/100). Son défaut est d'apparence : il ressemble à ce qu'une IA produit quand on lui demande « un portfolio éditorial haut de gamme ».
Ta mission : qu'on sente **une personne précise** (Hugo, producteur, tournages, cinéma de Hong Kong, jeux vidéo) et plus un gabarit bien exécuté.
Tu ne touches ni à l'architecture, ni au CMS, ni aux faits. Tu changes la direction visuelle, la composition et le ton.

## 1. Diagnostic : ce qui fait « Claude »

Chaque point ci-dessous est un tic reconnaissable. Pris un par un ils sont propres ; ensemble ils signent la machine.

| #   | Tic                                                                                                                                                                                | Où                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1   | Fond presque noir « chaud » + texte crème + serif d'affiche géante. C'est la palette par défaut du « premium sombre ». **Hugo n'aime pas la serif : elle part quoi qu'il arrive.** | `src/styles/tokens.css`                                  |
| 2   | Petites capitales espacées partout comme étiquettes (« 01 —— PORTFOLIO », « RÔLE », « ANNÉE »).                                                                                    | `.credits` dans `globals.css`, `SectionHead.astro`       |
| 3   | Sections numérotées 01 → 06 avec un filet.                                                                                                                                         | `SectionHead.astro`, `HomeView.astro`                    |
| 4   | Filets d'un pixel entre toutes les lignes de toutes les listes.                                                                                                                    | `ProjectList`, `Experience`, `Influences`, `ProjectView` |
| 5   | Boutons en pilule, flèches ↗ →, tout en capitales.                                                                                                                                 | `Hero`, `Contact`, `SiteNav`, `ProjectView`              |
| 6   | Grille 12 colonnes parfaitement respectée, mêmes marges, même rythme vertical d'une section à l'autre. Rien ne dépasse, rien n'est de travers.                                     | toutes les `*.module.css`                                |
| 7   | Effets d'ambiance génériques : grain SVG, halo radial, apparition au scroll identique sur chaque bloc.                                                                             | `globals.css` (`body::after`, `.reveal`)                 |
| 8   | Motifs « cinéma » décoratifs et interchangeables : repères de viseur aux coins, carton « Fin », letterbox. Ils disent « cinéma » sans rien dire de **ses** films.                  | `.viewfinder`, `SiteFooter.astro`, `VideoPlayer`         |
| 9   | Une section claire inversée au milieu pour « casser le rythme ».                                                                                                                   | `Section.astro` (`tone="light"`), manifeste              |
| 10  | Texte de manifeste abstrait en très grand (« Chaque projet est une histoire… »).                                                                                                   | `Manifesto.astro`, `content/home.yaml`                   |
| 11  | Aucune trace de main : pas de photo de tournage, pas de document, pas d'écriture, pas d'irrégularité. Les seules images sont un portrait et des affiches de films d'autres gens.   | tout le site                                             |
| 12  | Symétrie des composants : chaque projet, chaque expérience, chaque jeu a exactement la même forme.                                                                                 | listes                                                   |

Ce qui est déjà humain, à **garder et amplifier** : les textes de la section Jeux (« Officiellement un jeu. En pratique : 40 % sur Path of Building… »), la citation de _A Better Tomorrow_ avec 英雄本色, le portrait, les titres de films en italique.

## 2. Principes de la nouvelle direction

1. **Le spécifique bat le générique.** Tout élément décoratif doit pouvoir répondre à « pourquoi ça, pour Hugo ? ». Sinon il part.
2. **Des documents plutôt que des décors.** La matière visuelle d'un producteur, ce sont des feuilles de service, des plans de travail, des dépouillements, des claps, des post-it, des tableaux de budget. C'est ça son « motif cinéma », pas des coins de viseur.
3. **De l'irrégularité voulue.** Des tailles qui varient selon l'importance réelle, des éléments légèrement de travers, des blocs qui débordent, des sections de formes différentes. Jamais aléatoire : chaque écart a une raison.
4. **Une voix.** Première personne, concret, un peu d'humour sec (le ton de la section Jeux), partout où c'est de l'interface. Pas de slogans.
5. **Moins d'effets.** On retire avant d'ajouter.
6. **Hong Kong assumé, pas saupoudré.** Si la référence reste, elle doit se voir dans un vrai parti pris graphique (affiches HK des années 80–90 : couleurs franches, titres bilingues empilés, sous-titres jaunes), à un ou deux endroits forts.

## 3. Contraintes non négociables

- **Faits** : ne rien inventer (poste, date, film, chiffre, client). Le contenu de `content/` est la source de vérité. Tu peux reformuler l'interface (`src/lib/i18n.ts`), pas les faits. Toute réécriture de texte éditorial est **proposée** à Hugo, pas publiée (voir § 6).
- **Aucune image inventée ou générée** présentée comme du travail de Hugo. Les emplacements d'images restent vides ou typographiques tant qu'il n'a rien fourni.
- **Technique** : Astro 7 statique, Keystatic, FR à `/` et EN à `/en`, navigation sans rechargement (`ClientRouter`), système Publié/Masqué. Ne pas ajouter de framework ni de librairie d'animation.
- **Qualité** : `npm run lint`, `npm run check`, `npm run format:check`, `npm run build`, `npm run test:e2e` (48 tests) restent verts. Accessibilité : axe sans violation, contrastes AA, focus visible, `prefers-reduced-motion` respecté.
- **Performance** : Lighthouse mobile ≥ 95, CLS < 0,05, JavaScript < 15 kB gzip. Le nom reste le plus grand élément du premier écran mobile (LCP = texte).
- **Polices** : **aucune serif** — Hugo n'aime pas ça (dit le 17/11). Les titres en Fraunces disparaissent ; tout le site passe en sans-serif (grotesque, étroite, monospace ou police d'affichage sans empattement, selon la piste). 2 familles maximum après ton passage (il y en a 3 aujourd'hui, ce qui a coûté 0,3 s de LCP simulé).
- **Git** : travailler sur la branche `astro`, commits petits et en anglais, pousser `astro`. **Ne jamais pousser sur `main`** sans un « push » explicite de Hugo.
- **Journal** : une ligne horodatée par étape dans `PROGRESS.md`, chaque choix dans `DECISIONS.md` (décision, raison, retour arrière).

## 4. Étape 0 — Avant de coder (obligatoire)

1. Lire `src/styles/tokens.css`, `src/styles/globals.css`, `src/views/HomeView.astro` et les 7 composants de `src/components/sections/`.
2. Lancer `npm run build && npm run preview` et capturer l'état actuel : `WIDTHS=375,768,1024,1440 node scripts/redesign/shots.cjs http://localhost:3100 <dossier> / /projets/pineapple-pie /projets/postmeridian /cv`.
3. Écrire dans `docs/redesign/DESIGN-HUMAIN.md` **trois pistes** de direction, en 10 lignes chacune, avec pour chacune : palette, polices, traitement des documents, ce qui est retiré. Pistes à considérer (tu peux en proposer d'autres) :
   - **A. « Bureau de production »** : fond papier ou kraft clair, encre noire, une couleur de tampon. Le site ressemble à un dossier de prod : feuille de service pour le parcours, dépouillement pour les compétences, étiquettes de bobines pour les films. Police de machine à écrire ou grotesque utilitaire pour les données, une grotesque grasse ou étroite pour les titres (pas de serif).
   - **B. « Affiche de Hong Kong »** : aplats francs (rouge, jaune, bleu nuit), titres empilés bilingues, sous-titres jaunes sur image, composition d'affiche. Plus risqué, très identitaire.
   - **C. « Carnet de tournage »** : sombre conservé mais réchauffé par de la matière (polaroïds de plateau, scotch, annotations manuscrites en SVG), mise en page de carnet, moins de capitales.
4. Rendre une **planche d'essai** par piste (une page HTML statique dans le scratchpad, capturée en PNG, avec les vrais textes : nom, deux projets, une expérience) et la montrer à Hugo. **Demander son choix avant d'aller plus loin** : c'est la seule question bloquante autorisée.

## 5. Lots de travail (après le choix de Hugo)

Dans cet ordre. Chaque lot se termine par des captures 375 / 768 / 1024 / 1440 et la suite de tests.

### Lot 1 — Fondations visuelles

- Réécrire `src/styles/tokens.css` pour la piste retenue : couleurs, 2 polices **sans empattement**, échelle typographique. Retirer Fraunces partout (titres, CV, image de partage) ; les titres de films étaient en italique serif : trouver un autre marqueur, par exemple une graisse ou une couleur.
- Supprimer de `globals.css` : le grain (`body::after`), le halo radial du `body`, la classe `.viewfinder`.
- Revoir `.credits` : les capitales espacées ne servent plus qu'aux **données** (dates, rôles dans un tableau), plus aux titres de section ni aux boutons.
- Fichiers : `tokens.css`, `globals.css`, `astro.config.mjs` (bloc `fonts`), `src/fonts/`, `src/lib/og.ts` (police et couleurs de l'image de partage).
- **Terminé quand** : plus aucune couleur en dur hors tokens ; 2 familles de polices, aucune serif ; contrastes vérifiés par calcul et notés dans `DESIGN-HUMAIN.md`.

### Lot 2 — En finir avec le gabarit de section

- `SectionHead.astro` : retirer la numérotation 01–06 et le filet. Chaque section reçoit un titre **à sa manière** (un titre manuscrit, un onglet de classeur, un en-tête de formulaire… selon la piste), pas le même composant répété.
- `Section.astro` : retirer le système « section claire inversée » s'il ne sert plus la piste ; varier les largeurs et les fonds par section, avec une raison.
- Supprimer les filets d'un pixel systématiques dans les listes ; n'en garder que là où il y a un vrai tableau.
- **Terminé quand** : deux sections voisines n'ont jamais la même structure d'en-tête ni le même rythme.

### Lot 3 — Le premier écran

- `Hero.astro` / `Hero.module.css` : composition moins « affiche centrée sur une grille ». Idées : le portrait traité comme une vraie photo (bord blanc de tirage, légère rotation, légende manuscrite) ; le métier dit en une phrase à la première personne plutôt qu'en étiquette ; la citation de John Woo traitée comme un **sous-titre de film** (jaune, bas d'image) plutôt qu'en bloc de crédits.
- Garder : le nom comme plus grand élément (LCP), les deux boutons d'action, 英雄本色.
- **Terminé quand** : le premier écran mobile et desktop ne pourrait pas être celui d'un autre portfolio en changeant seulement le nom.

### Lot 4 — Le parcours et les compétences en documents

- `Experience.astro` : le présenter comme une **feuille de service** ou un plan de travail (colonnes Dates / Poste / Production / Lieu, cases, tampon « EN COURS » sur les postes actuels). Les données sont celles de `content/experiences/`.
- `Skills.astro` : en **dépouillement** ou liste de matériel cochée, pas en « générique de fin ».
- `CvView.astro` : aligner le CV sur ce langage (c'est déjà un document).
- **Terminé quand** : un professionnel de la production reconnaît le type de document au premier regard.

### Lot 5 — Les projets

- `ProjectList.astro` : hiérarchie selon l'importance réelle, pas deux blocs identiques. POSTMERIDIAN et 489Productions n'ont pas à avoir la même forme. La filmographie peut devenir des étiquettes de boîtes de film ou des lignes de catalogue avec la vignette.
- `ProjectView.astro` / `VideoPlayer.astro` : retirer le letterbox décoratif et les repères de viseur ; le lecteur vidéo ressemble à un écran, la fiche technique à une fiche technique (rôle, année, format).
- `Gallery.astro` : présentation en planche-contact ou en tirages, cohérente avec la piste.
- **Terminé quand** : chaque page projet a un élément qui lui est propre (au minimum via les champs existants : logo, vignette, année, rôle).

### Lot 6 — Influences et contact

- `Influences.astro` : c'est la section la plus personnelle, la traiter comme telle : notes de visionnage, étagère de VHS/DVD, ticket de cinéma. Mettre le ton des textes de jeux en avant, en plus grand.
- `Contact.astro` : remplacer « Travaillons ensemble » en corps 200 par quelque chose de direct. Garder e-mail, copie, CV, réseaux.
- `SiteFooter.astro` : retirer le carton « Fin » s'il n'est plus dans le ton ; sinon le justifier.

### Lot 7 — Navigation, mouvement, détails

- `SiteNav.astro` : la barre en pilule flottante est un tic. Proposer une forme cohérente avec la piste (onglets de classeur, bande de titre, etc.). **Conserver** : dock en bas sur mobile, `dialog` natif, liens de langue, comportement à 6 onglets, tous les `data-*` utilisés par les tests.
- Mouvement : retirer `.reveal` uniforme. Deux ou trois animations qui ont un sens (un tampon qui s'applique, une photo qui se pose) valent mieux qu'un fondu partout. Garder l'ident 489 tel quel sauf demande contraire.
- Boutons : une forme qui ne soit pas la pilule en capitales.
- `Arrow.astro` : garder le composant, limiter l'usage.

### Lot 8 — La voix (interface seulement)

- Réécrire les micro-textes de `src/lib/i18n.ts` en FR et EN, première personne, concrets : libellés de boutons, 404, indications du lecteur vidéo, CV. Ton de référence : `content/games/*.yaml`.
- Dans `docs/redesign/TEXTES-PROPOSES.md`, **proposer** (sans publier) : 3 accroches pour le hero, une version courte du manifeste, un titre pour la section Contact. Hugo choisit et colle dans `/keystatic`.

### Lot 9 — Emplacements pour la vraie matière

- Vérifier que chaque endroit où une photo de Hugo changerait tout est prêt à la recevoir depuis `/keystatic` sans code : couverture et galerie de projet (déjà là), photo de tournage dans le hero ou le parcours (à ajouter si la piste le demande : champ image optionnel dans `keystatic.config.ts`, rendu conditionnel, rien d'affiché si vide).
- Lister dans `REVIEW.md` les **10 images** qui auraient le plus d'effet, avec le format attendu, pour que Hugo sache quoi fournir.

## 6. Ce qui demande Hugo (ne pas le faire à sa place)

- Le choix de la piste (étape 0).
- Toute photo, document scanné, écriture manuscrite réelle. Tu peux préparer un emplacement « signature / annotation » en SVG et lui demander un scan ; tu ne fabriques pas une fausse écriture présentée comme la sienne. Une police manuscrite est acceptable **si elle est annoncée comme telle** dans `DECISIONS.md` et remplaçable.
- Les textes éditoriaux (accroche, manifeste, Personal brand).
- La mise en ligne.

## 7. Vérification et livrables

- Avant / après : captures dans `docs/redesign/screenshots/humain/before` et `/after`, aux 4 largeurs, pour `/`, `/en`, `/projets`, une page de court-métrage, `/projets/postmeridian`, `/cv`.
- Test du « changement de nom » : pour chaque écran, écrire en une ligne dans `REVIEW.md` ce qui le rend propre à Hugo. Si tu ne trouves rien, l'écran n'est pas fini.
- Relire la table du § 1 à la fin et noter, tic par tic : supprimé, transformé, ou gardé (avec la raison).
- Tests : adapter ceux qui dépendent du texte ou de la structure (`tests/e2e/*.spec.ts`), sans en supprimer ni en désactiver. Ajouter un test si tu ajoutes un comportement.
- Mettre à jour `DESIGN.md` (ou le remplacer par `DESIGN-HUMAIN.md`), `DECISIONS.md`, `PROGRESS.md`, et une section datée en tête de `REVIEW.md` : ce qui a changé, ce qui attend Hugo, les mesures avant/après.

## 8. Ordre de priorité si le temps manque

1. Étape 0 et choix de Hugo.
2. Lots 1, 2, 3 (ce sont eux qui changent la première impression).
3. Lots 4 et 5.
4. Lots 8 et 9.
5. Lots 6 et 7.

## 9. Repères techniques

- Lancer : `npm i && npm run dev` (site sur http://localhost:4321, back-office sur `/keystatic`).
- Build et aperçu : `npm run build && npm run preview` (http://localhost:3100).
- Captures : `scripts/redesign/shots.cjs` (variable `FAKE_YT=<image>` pour simuler les vignettes YouTube, bloquées dans certains environnements).
- Mesures : `scripts/redesign/lh-median.sh <url> 3 <libellé>`, `scripts/redesign/js-weight.sh <url>`.
- CV en PDF après tout changement du CV : `npm run build && npm run cv`.
- Le contenu se lit au build via `src/lib/content.ts` ; les images du CMS sont dans `src/assets/images/<collection>/<slug>/`.
