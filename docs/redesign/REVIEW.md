# REVIEW — Refonte du portfolio (branche `redesign/v2`)

> La version Next.js (sessions 1 et 2) est en ligne sur `main`. La version Astro (session 3) est sur la branche `astro` : § 00.
> Journal : [PROGRESS.md](PROGRESS.md) · Décisions : [DECISIONS.md](DECISIONS.md) · Audit : [AUDIT.md](AUDIT.md) · Direction artistique : [DESIGN.md](DESIGN.md) · Incohérences : [INCOHERENCES.md](INCOHERENCES.md)

## 000. Session 6 (16/11) — plan d'amélioration, points 2 à 6

> Tout est sur la branche `astro`. **Rien de cette session n'est en ligne** tant que tu n'as pas dit « push » (la correction du chevauchement des titres attend aussi).

**Fait**

- **Message (2)** : deux boutons dans le hero (« Voir mes projets », « Me contacter ») ; anglais relu et corrigé (tournures, pas les faits) ; harmonisations : « Audiovisual Producer » comme en français, dates écrites en entier, « Head of Production », « Le Syndicat du crime », 489Productions « Directing… » pour « Réalisation… ».
- **Contact (3)** : bouton « Copier l'adresse » ; page **CV** (`/cv`, `/en/cv`) générée à partir du parcours, des projets et des compétences, avec **PDF d'une page** téléchargeable (FR et EN) ; champ optionnel « Lien de prise de rendez-vous » dans le back-office (vide = pas de bouton).
- **Autonomie (4)** : champs prêts dans /keystatic › Réglages du site pour le code Google Search Console et la mesure d'audience Vercel (désactivée par défaut).
- **Design (5)** : **galerie** sur les pages projet (le champ existait mais n'était affiché nulle part) avec visionneuse plein écran (flèches, Échap) ; **couverture** affichée dans la liste des projets et utilisée en fond de l'**image de partage** quand elle est renseignée ; icône d'écran d'accueil et manifeste pour mobile.
- **Fiabilité (6)** : tests automatiques sur GitHub à chaque modification (`.github/workflows/ci.yml`) ; contrôle d'accessibilité automatisé (axe, WCAG 2.1 AA) sur 7 pages + clavier + menu ; 48 tests au total. Un défaut trouvé et corrigé : les liens « FR / EN » s'annonçaient « Français / English » aux lecteurs d'écran sans contenir le texte visible.

**Ce qui dépend de toi**

1. **Accroche** : je n'ai pas réécrit « Chaque projet est une histoire… » — il me faut ce que tu cherches (missions, poste, collaborations) et pour qui. Elle se modifie dans /keystatic › Réglages du site.
2. **« Fondateur » ou « co-fondateur »** de POSTMERIDIAN : non tranché, texte inchangé.
3. **CV** : relis `/cv` et le PDF. Pour le masquer : décocher « Afficher le CV ». Après une modification du parcours, régénérer le PDF : `npm run build && npm run cv`, puis commit.
4. **Instagram et autres réseaux** : à ajouter dans /keystatic › Réglages du site › Réseaux. **Rendez-vous** : coller ton lien Calendly/Cal.com au même endroit.
5. **Adresse e-mail à ton nom de domaine** : à créer chez ton hébergeur de domaine, puis la mettre dans les réglages.
6. **Back-office en ligne** : étapes au § 00 (15 minutes, création d'une application GitHub).
7. **Mesure d'audience** : activer Web Analytics dans Vercel, puis choisir « Vercel » dans les réglages du site. **Search Console** : déclarer `hugopezzo.fr`, choisir la méthode « Balise HTML », coller le code dans les réglages.

**Non fait, et pourquoi**

- **Formulaire de contact** : il faut un service d'envoi d'e-mails (compte + clé), que je ne crée pas sans toi. Le bouton de copie et le lien de rendez-vous couvrent l'essentiel.
- **Essais sur iPhone / Safari / Firefox** : seul Chromium est disponible dans ma session. À faire à la main sur tes appareils.
- **Section Influences** : laissée telle quelle (pas de demande précise, et elle fonctionne).
- **Suppression des anciennes branches / tag de retour arrière** : je n'ai pas supprimé de branche sans ton accord ; le tag reste bloqué par le proxy.

**Mesures (Lighthouse mobile, local)** : performance 99, accessibilité 100, SEO 100. Temps d'affichage sous connexion ralentie : 0,9 s. Temps simulé (PageSpeed) : environ 1,95 s — il était à 1,66 s avant le changement de polices de la session 5 (trois familles au lieu de deux).

## 00. Session 3 — passage à Astro (branche `astro`)

**Ce qui change pour toi : rien de visible.** Même design, mêmes adresses, même back-office, même bascule FR/EN sans rechargement. Ce qui change, c'est le moteur : le site n'embarque plus React côté visiteur.

| Mesure (Lighthouse mobile, local, médiane de 3) | Next.js (en ligne aujourd'hui)         | **Astro**                                              |
| ----------------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| Score performance                               | 96–99                                  | **99–100**                                             |
| LCP simulé (ce qu'affiche PageSpeed Insights)   | 2,2–2,7 s                              | **1,66 s** ✅ (< 1,8 s)                                |
| LCP sous throttling appliqué                    | 1,0 s                                  | **0,95 s**                                             |
| JavaScript envoyé                               | 142 kB gzip                            | **≈ 5 kB gzip**                                        |
| Poids du HTML de l'accueil                      | 34 kB gzip                             | **16 kB gzip**                                         |
| Images                                          | optimisées à la demande par le serveur | **optimisées au build** (AVIF/WebP, plusieurs tailles) |

Vérifié : build, lint, typage, Prettier ; les 28 tests Playwright (navigation, bascule FR/EN qui garde la position, un seul document chargé sur tout un parcours, visibilité masqué/publié en FR et EN, 404, anciennes URL) ; parcours back-office créer → voir → supprimer (5 s) ; build au format Vercel (redirections natives, 404).

**Pour mettre la version Astro en ligne** : fusionner `astro` dans `main`. `vercel.json` force le framework « Astro » côté Vercel, rien à régler à la main. Si le build Vercel échouait, la version Next.js actuelle resterait en ligne (Vercel ne remplace la production qu'après un build réussi).

**Mode GitHub du back-office (édition en ligne), version Astro** — mêmes étapes qu'au § 5, avec ces noms de variables :
`PUBLIC_KEYSTATIC_STORAGE=github`, `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (l'assistant de `/keystatic` en local les génère dans `.env` ; pour le lancer : `PUBLIC_KEYSTATIC_STORAGE=github npm run dev`). URL de callback : `https://hugopezzo.fr/api/keystatic/github/oauth/callback`.

**Commandes** : `npm run dev` (site sur http://localhost:4321, back-office sur /keystatic), `npm run build`, `npm run preview` (http://localhost:3100), `npm run test:e2e`.

## 0. Session 2 (15/11 après-midi) — suite à ton retour

**Ce qui a changé**

- **FR ↔ EN sans recharger la page.** Le clic sur FR/EN remplace seulement le contenu : même page, même endroit de lecture, la langue du document suit. Les deux langues restent des pages séparées et indexables (`/` et `/en`, hreflang, sitemap).
- **Plus aucun rechargement en naviguant** : accueil, projets, pages… Testé en local sur un parcours desktop (liste → projet → EN → accueil) et sur la bascule FR → EN (desktop + mobile) : un seul document chargé du début à la fin. Coût : +3 kB de JavaScript (139 → 142 kB gzip). Rien n'est préchargé au chargement de la page : la page suivante (ou l'autre langue) est anticipée seulement au survol, au focus ou au toucher d'un lien, donc le clic reste quasi instantané sans alourdir la visite.
- **Temps d'affichage** : sur mobile, le nom « Hugo Pezzo » est désormais l'élément principal de l'écran (il était découpé en deux blocs, et le portrait passait devant). Résultat sous connexion mobile ralentie : **LCP 1,4 s → 1,0 s**, il tombe en même temps que le premier affichage. Visuellement rien ne change, sauf le portrait mobile qui passe en carré. Police de texte allégée (35 → 27 kB).
- **Faits corrigés** : POSTMERIDIAN fondé en **avril 2024 à Montpellier** (parcours + fiche projet) ; « 8 ans d'expérience en production audiovisuelle et 2 ans en production de jeux vidéo ». Djogo reste masqué.
- **Personal brand** : je n'ai pas touché à ton texte. J'ai juste ajouté un champ **« Liens »** à chaque bloc des pages libres (pour ton Instagram, etc.) : ils s'affichent en boutons.
- 404 désormais bilingue.

**Mesures (Lighthouse mobile, local, médiane de 3)**

|                                                       | Avant session 2 | Après                                           |
| ----------------------------------------------------- | --------------- | ----------------------------------------------- |
| LCP sous throttling appliqué (le plus proche du réel) | 1,4 s           | **1,0 s**                                       |
| LCP simulé (ce qu'affiche PageSpeed Insights)         | 2,2–2,7 s       | 2,2–2,7 s (varie d'un passage à l'autre)        |
| Score performance                                     | 97–98           | 96–99                                           |
| **Desktop** (Lighthouse desktop)                      | non mesuré      | **score 100, LCP 0,5–0,6 s** (élément : le nom) |

**Pourquoi le chiffre de PageSpeed ne descend pas, et l'option pour aller plus loin**
Le LCP « simulé » de PageSpeed est dicté par le JavaScript de Next.js/React (~130 kB), téléchargé avant l'affichage. J'ai fait l'expérience : **la même page sans ce JavaScript tombe à 1,4–1,6 s simulé, score 100**. Le seul moyen d'y arriver est de changer de socle, par exemple **Astro**, qui fait aussi la navigation sans rechargement, garde Keystatic et le même design. C'est une réécriture d'environ une journée. Je ne l'ai pas lancée sans ton accord, parce que le brief imposait Next.js. Dis-moi si tu la veux.

**À vérifier sur la preview Vercel avant de merger** (je ne peux pas l'ouvrir d'ici) :

- [ ] `/`, `/projets`, `/en` s'affichent ; passer FR → EN → FR depuis une page projet ne recharge pas la page (l'onglet du navigateur ne « tourne » pas).
- [ ] Recharger directement `/en/projets/postmeridian` et `/projets/postmeridian` → 200.
- [ ] Ouvrir l'onglet Réseau (DevTools) et naviguer en français : `/` → `/projets` → un projet → « Parcours ». Il ne doit y avoir **qu'une seule requête « document »**, et les requêtes `_rsc` / `.rsc` doivent répondre 200 (un 404 sur celles-ci = rechargements complets silencieux).
- [ ] `/fr/projets` → redirige vers `/projets` ; `/fr/opengraph-image` et `/fr/projets/postmeridian/opengraph-image` → image PNG, sans redirection.
- [ ] `/nope` et `/en/nope` → page 404 bilingue.
- [ ] Si la navigation sans rechargement pose problème sur Vercel (cas peu probable, lié aux _rewrites_ qui servent le français à la racine) : annuler le seul commit `682608a` (`git revert 682608a`, petit conflit attendu dans `Hero.tsx`). On garde ainsi les corrections de contenu et le travail sur le LCP.

## 1. Résumé en 10 lignes

1. Nouvelle direction artistique **« Carton de générique »** : noir chaud, blanc os, un seul rouge vermillon, typographie d'affiche (Gloock) pour les titres et un texte net (Hanken Grotesk). Les cartes carrées bordées et les boutons rouges pleins ont disparu.
2. Le site se lit comme un générique : sections numérotées façon Criterion, projets sur deux niveaux (les structures en grand, les courts-métrages en filmographie), compétences en « générique de fin », manifeste en carton inversé clair.
3. **Navigation évidente** : barre en haut sur desktop, qui suit la section active ; **dock en bas d'écran sur mobile** (sous le pouce), qui ouvre un menu plein écran accessible (Échap, focus, lien d'évitement).
4. **Back-office Keystatic** sur `/keystatic` : tout le contenu (textes FR/EN, projets, parcours, influences, onglets, ordre des sections) vit dans `content/` et se modifie sans toucher au code (sauf les micro-copies de l'interface : `src/lib/i18n.ts`). En production, le back-office n'est ouvert qu'une fois le mode GitHub activé (§ 5).
5. **Masquer / afficher en un clic** : un champ « Statut » sur chaque onglet, section, page et entrée. Masqué = absent du menu et du sitemap, `noindex`, 404 en production ; en développement l'élément reste visible avec un badge « Masqué ». En ligne, le changement apparaît après le redéploiement automatique (1 à 2 min).
6. **Bilingue servi en HTML** : le français est sur `/`, l'anglais sur `/en`. Avant, l'anglais n'apparaissait qu'après le chargement du JavaScript et Google ne pouvait pas l'indexer.
7. **Performance** : toutes les pages sont générées à l'avance, framer-motion est supprimé, les animations sont en CSS, les polices sont auto-hébergées, et le portrait de 8 Mo est remplacé par une source de 300 Ko servie en AVIF.
8. **Animations** : un ident 489Productions d'1,2 s maximum, joué une fois par session (passable au clic, désactivable dans le CMS) ; des apparitions au scroll, une entrée de page à chaque navigation (et une transition native lors d'un chargement complet) et des micro-interactions. Tout est coupé si l'appareil demande moins d'animations.
9. **Nettoyage** : la démo ASCII « @chenglou/pretext », la pluie, le grain animé et les colonnes de caractères chinois décoratifs ont disparu. 英雄本色 reste une seule fois, vectorisé, comme signature.
10. **SEO** : métadonnées par page, liens FR/EN (hreflang), images de partage générées (site et chaque projet), sitemap et robots qui respectent le statut, données structurées `Person`. Les anciennes URL redirigent vers les nouvelles.

## 2. Avant / après

| 375 px                                                                             | 768 px                                                                             | 1440 px                                                                              |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [avant](screenshots/before/home-375.png) · [après](screenshots/after/home-375.png) | [avant](screenshots/before/home-768.png) · [après](screenshots/after/home-768.png) | [avant](screenshots/before/home-1440.png) · [après](screenshots/after/home-1440.png) |

**Note** : sur les captures pleine page, la bande plus claire sur le premier écran (coupure à 900 px) et la barre de navigation posée au milieu de la page sont des artefacts de capture (grain et dock en `position: fixed`), pas des bugs.

Tout est dans [`screenshots/before/`](screenshots/before/), [`screenshots/after/`](screenshots/after/) (accueil, pages projet, à 375 / 768 / 1024 / 1440 px), [`screenshots/mid/`](screenshots/mid/) et [`screenshots/motion/`](screenshots/motion/) (images de l'ident, du scroll et des transitions, avec [NOTES.md](screenshots/motion/NOTES.md)).

**Métriques.** Lighthouse mobile, build de production local (`next start`). Fichiers bruts dans [`metrics/`](metrics/).

| Mesure                                                         | Avant (accueil) | Après (accueil)              | Après (page projet) | Cible             |
| -------------------------------------------------------------- | --------------- | ---------------------------- | ------------------- | ----------------- |
| Performance                                                    | 90              | **97**                       | **96–98**           | ≥ 95 ✅           |
| Accessibilité                                                  | 92              | **100**                      | **100**             | 100 ✅            |
| Bonnes pratiques                                               | 100             | **100**                      | **100**             | ≥ 95 ✅           |
| SEO                                                            | 100             | **100**                      | **100**             | 100 ✅            |
| LCP simulé (méthode Lighthouse par défaut)                     | 3,5 s           | 2,5 s                        | 2,4–2,6 s           | < 1,8 s ⚠️        |
| LCP sous throttling appliqué (devtools)                        | —               | **1,3 s**                    | —                   | < 1,8 s ✅        |
| LCP observé en local (sans réseau)                             | —               | 0,16 s (= premier affichage) | —                   | —                 |
| CLS                                                            | 0               | **0,001**                    | **0–0,001**         | < 0,05 ✅         |
| TBT (l'INP n'a pas été mesuré, TBT = meilleur indicateur labo) | 50 ms           | 40–90 ms                     | 50–110 ms           | INP non mesuré ⚠️ |
| JS transféré (gzip, Lighthouse)                                | 192 kB          | **143 kB**                   | 143 kB              | —                 |
| JS first-load (brotli / gzip)                                  | —               | **119 / 139 kB**             | —                   | ≤ 120 kB gzip ⚠️  |

**Les deux ⚠️ s'expliquent :**

- **JS ≤ 120 kB gzip** : Next 16 + React 19 pèsent déjà **129 kB gzip** sur une page vide (mesuré, décision 13). Le site n'ajoute qu'environ 10 kB : le seul composant client est la navigation, plus un petit lecteur vidéo sur les pages de courts-métrages. Pour info, Vercel sert en brotli (119 kB), mais la cible est en gzip : **non atteinte**.
- **LCP simulé à 2,5 s** : c'est l'estimation pessimiste de Lighthouse. Sous throttling réellement appliqué, le LCP est à 1,3 s ; sans throttling et **en local** (sans réseau réel), il tombe en même temps que le premier affichage (0,16 s) — ce n'est pas un temps de chargement réel en ligne. L'ident n'y change rien : les chiffres sont les mêmes avec et sans (protocole ON/OFF, 3 runs par méthode, [`metrics/lcp-protocol.txt`](metrics/lcp-protocol.txt), décision 23).

## 3. Comment lancer

```bash
npm i && npm run dev
```

- Site : http://localhost:3000 (anglais : http://localhost:3000/en)
- Back-office : http://localhost:3000/keystatic

Autres commandes :

- `npm run build` : build de production.
- `npm run lint` et `npm run format:check` : vérifications du code.
- `npm run test:e2e` : 22 tests Playwright, après un build. Ils demandent `npx playwright install chromium` sur une nouvelle machine.
- `npm run test:cms` : parcours CMS, avec un `npm run dev -- -p 3200` lancé à côté.

## 4. Mode d'emploi du CMS (`/keystatic`)

### Ajouter un projet (moins de 2 minutes)

1. **Projets** → **Add** (en haut à droite).
2. Remplir **Titre** (l'adresse `/projets/…` se génère toute seule), **Catégorie**, **Étiquette**, **Rôle(s)** et le **Résumé** FR (l'EN est optionnel : à défaut, le FR est affiché).
3. Optionnel : **Année**, **Image de couverture** (« Choose file ») avec son texte alternatif, **Vidéo YouTube** (l'identifiant après `v=`), **Liens**.
4. **Ordre** : plus petit = plus haut dans la liste. Les courts-métrages vont automatiquement dans la filmographie.
5. **Create**. Le projet apparaît tout de suite en local. En ligne, il apparaît après le redéploiement automatique (mode GitHub, § 5).

### Modifier un texte ou une page

1. Textes de l'accueil (titres et intros des sections, manifeste, contact) : **Page d'accueil**. Nom, accroche, portrait, e-mail, réseaux, SEO : **Réglages du site**.
2. Parcours : **Parcours**. Compétences : **Compétences**. Films et jeux : **Influences**. Pages libres (dont Personal brand) : **Pages libres**.
3. Chaque texte a deux colonnes, **Français** et **English**.
4. Pour réordonner les sections de l'accueil ou les onglets, glisser les poignées ⋮⋮.
5. **Save**.

### Masquer ou afficher un onglet

1. **Navigation (onglets)** → ouvrir l'onglet → **Statut** : « Masqué » ou « Publié » → **Save**. L'onglet sort du menu.
2. Pour masquer **toute une section de l'accueil** : **Page d'accueil** → la section → **Statut**. L'onglet qui y mène disparaît avec elle.
3. Pour une **page libre** (ex. Personal brand) : **Pages libres** → la page → **Statut**. Masquée, elle renvoie 404, sort du menu et du sitemap. Publiée, elle apparaît partout. Un seul interrupteur suffit.
4. Même principe pour un **projet**, une **expérience**, un **film** ou un **jeu**. Une rubrique vide (par exemple aucun jeu publié) disparaît d'elle-même.
5. En local (`npm run dev`), les éléments masqués restent visibles avec un badge rouge **MASQUÉ**, pour se relire. En production ils n'existent pas.

## 5. Déploiement (prévu le 16/11 au matin)

**Avant le merge**

- [ ] Relire le site en local (`npm run dev`) et les points du § 7.
- [ ] `npm run build && npm run lint && npm run test:e2e` → tout vert.

**Merge et déploiement**

1. Ouvrir une PR `redesign/v2` → `main`, puis la merger. Vercel déploie `main` automatiquement.
2. Variables d'environnement : **aucune n'est nécessaire** pour le site public. Le back-office reste fermé en production (404) tant que le mode GitHub n'est pas activé.
3. Le domaine `hugopezzo.fr` est déjà déclaré comme URL canonique (`content/site.yaml` › `url`).

**Activer l'édition en ligne (Keystatic en mode GitHub), pas à pas**

1. En local, créer un fichier `.env` contenant `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` (et, si le repo change, `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER` / `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` ; par défaut `Merlinn-H/portfolio`).
2. `npm run dev` → ouvrir http://localhost:3000/keystatic. Keystatic propose de **créer une GitHub App** : suivre l'assistant (nom de l'app, accès au repo `portfolio`). À la fin, il écrit dans `.env` : `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. Dans les réglages de la GitHub App créée, ajouter l'URL de callback de production : `https://hugopezzo.fr/api/keystatic/github/oauth/callback`.
4. Vercel → Project → Settings → Environment Variables : copier ces 5 variables (`NEXT_PUBLIC_KEYSTATIC_STORAGE=github` + les 4 générées) en Production, puis **Redeploy**.
5. Vérifier : `https://hugopezzo.fr/keystatic` demande une connexion GitHub, et une modification enregistrée crée un commit sur `main`, ce qui déclenche un redéploiement (1 à 2 min). **Un changement de statut (masquer ou afficher) n'est visible en ligne qu'après ce redéploiement**, puisque les pages sont générées au build.

**Vérifications après déploiement**

- [ ] `/`, `/en`, `/projets`, `/projets/postmeridian` → 200 ; `/personal-brand` → 404 ; `/489productions` → redirige vers `/projets/489productions` ; `/films` → redirige vers `/projets`.
- [ ] `/sitemap.xml` ne contient ni `personal-brand` ni rien de masqué ; `/robots.txt` interdit `/keystatic`.
- [ ] Partager un lien de projet (Slack, LinkedIn, iMessage) → l'image de partage s'affiche.
- [ ] Lighthouse mobile sur la home de production.

**Retour arrière**

- La v1 correspond exactement au commit **`a821386`**, qui est aussi le `main` actuel. Le tag `pre-redesign` existe en local ici, mais **le proxy de la session a refusé de le pousser (HTTP 403)**. À créer avant le merge : `git tag pre-redesign a821386 && git push origin pre-redesign`.
- En cas de problème après le merge : Vercel → Deployments → redéployer le dernier déploiement de la v1 (« Promote to Production »), ou `git revert -m 1 <commit de merge>` sur `main`.

## 6. Décisions prises seul

Les 25 décisions sont dans [DECISIONS.md](DECISIONS.md). Les 5 plus importantes :

1. **Keystatic, contenu en YAML dans le repo**, back-office fermé en production tant que le mode GitHub n'est pas activé (sinon n'importe qui pourrait écrire). Testé : un enregistrement depuis l'admin ne modifie que le champ édité (décisions 6 et 7).
2. **Direction « Carton de générique »** retenue parmi 3 avec Fable : Gloock et Hanken Grotesk, vermillon `#ef4130`. C'est le rouge historique éclairci, parce que `#d30000` ne passe pas le contraste minimal (décisions 10 et 11, [DESIGN.md](DESIGN.md)).
3. **FR sur `/`, EN sur `/en`**, entièrement statiques, au lieu d'une bascule côté navigateur (décision 4).
4. **L'ident d'ouverture anime le logo 489Productions**, seul logo existant, sans le redessiner. Il est **à valider** (un logo d'entreprise en ouverture d'un site personnel) et se coupe en un clic dans le CMS (décisions 11 et 23).
5. **Suppression de Tailwind et de framer-motion** : CSS Modules et tokens, animations en CSS, View Transitions natives (décisions 13 à 16).

## 7. À valider par Hugo

**Faits à vérifier** (rien n'a été corrigé, liste complète dans [INCOHERENCES.md](INCOHERENCES.md)) :

- ✅ POSTMERIDIAN : fondé en avril 2024 à Montpellier (corrigé). Reste : « Fondateur & Producteur » (site) contre « co-fondateur, producteur exécutif » (brief).
- ✅ Années d'expérience : « 8 ans en production audiovisuelle + 2 ans en production de jeux vidéo » (corrigé).
- « 4 courts-métrages dont 2 sélectionnés en festivals » alors que la page n'en montre que 3.
- Titre : « Producteur Audiovisuel » (FR) contre « Film Producer » (EN).
- Année de création de 489Productions : le champ a été laissé vide, parce que « 2023 » est la date d'arrivée de Hugo.
- E-mail public : `hugopezzo@outlook.com` ?

**Textes resserrés ou ajoutés** (les faits n'ont pas changé) :

- Titres SEO et descriptions de partage FR/EN : `content/site.yaml`.
- Micro-copies de l'interface : `src/lib/i18n.ts` (« Coupez ! » pour la 404, « Filmographie — courts-métrages », etc.).
- Titre de section « Projets » (avant : « Mes Projets ») ; section « Influences » (avant : « Univers »).
- Textes alternatifs générés : « Portrait de Hugo Pezzo », « Affiche de … », « Logo … ».

**Contenus `[À RÉDIGER]`** : la page **Personal brand** (masquée) contient une introduction, Manifeste, Contenus, Réseaux et Contact, tous à écrire.

**Corrections de forme faites dans les textes** (sans changer les faits) : « Postmeridian » → « POSTMERIDIAN » dans le résumé du projet ; « L'échecs en 8 joueurs » → « Les échecs à 8 joueurs » (TFT) ; « Into The Breach » → « Into the Breach » ; sur-titre EN de la section Parcours « Experience » → « Career » (le titre disait déjà « Experience »).

**Autres incohérences de forme non corrigées** : capitalisation des titres de films (« Le Syndicat du Crime » / « Le Cercle rouge ») ; dates abrégées ou non (« Oct. 2022 » / « Juin 2017 ») ; EN « Production Director » (Résonance) contre « Head of Production » (parcours).

**Entrées masquées à relire avant publication** :

- Page **Personal brand** (`/personal-brand`).
- Expérience **Djogo — Créateur de contenus / Responsable communication, depuis fin août 2026, Lyon**, sans description. Reste masquée pour l'instant (choix de Hugo, 15/11).

**Choix à confirmer** : l'ident 489Productions au chargement (§ 6.4) ; le libellé anglais « Personal brand » dans la nav FR.

## 8. Ce qui n'a pas été fait, et la suite

**Non fait, ou fait autrement :**

- **Screenshots du site en ligne** : `vercel.app` et `hugopezzo.fr` sont bloqués par le proxy de la session. Les captures « avant » sont prises sur un build local du code de la v1 (même code que la production, rendu supposé identique, non comparé).
- **Vignettes des courts-métrages** : YouTube est inaccessible depuis la session. Les courts-métrages ont donc des cartons typographiques. Il suffit d'ajouter une couverture dans le CMS pour qu'elle soit utilisée.
- **Tag `pre-redesign` non poussé** (403, voir § 5).
- **JS ≤ 120 kB gzip** et **LCP simulé < 1,8 s** : non atteints pour les raisons du § 2.
- **Curseur personnalisé** (backlog) : non fait, parce qu'il demande du JS pour un gain faible. Les états de chargement ne s'appliquent pas, le site étant statique.
- **404 en anglais** : une URL inconnue sous `/en/…` affiche la 404 en français (limite de la 404 globale de Next avec deux layouts FR/EN).

**Prochaines étapes recommandées :**

1. Activer le mode GitHub de Keystatic (§ 5) pour éditer depuis le téléphone.
2. Ajouter des images : couvertures des courts-métrages, photos de tournage, visuels POSTMERIDIAN. C'est ce qui manque le plus pour un rendu « haut de gamme ».
3. Rédiger Personal brand et relire Djogo, puis les publier.
4. Trancher les incohérences du § 7.
5. Une page projet POSTMERIDIAN plus riche (galerie, trailer) quand le jeu sera montrable.
