# PROGRESS — Refonte portfolio (branche `redesign/v2`)

Format : `HH:MM — ✅ fait / ⚠️ problème / ➡️ suite` (heure de Paris)

03:27 — ✅ Tag `pre-redesign` posé sur l'état actuel (a821386), branche `redesign/v2` créée, dossiers `docs/redesign/` initialisés.
03:28 — ⚠️ Le site en prod (vercel.app) est bloqué par le proxy réseau de la session (403) → screenshots « avant » faits sur le build local du tag `pre-redesign`.
➡️ Phase 0 : audit du code, inventaire assets, screenshots before, mesure perf.
03:31 — ⚠️ hugopezzo.fr aussi bloqué par le proxy (403) ; je l'utilise comme domaine canonique (SEO/OG/sitemap).
03:33 — ✅ Audit écrit (`AUDIT.md`), screenshots before 375/768/1440 (home, 489productions, films), Lighthouse mobile before : home Perf 90 / A11y 92 / LCP 3,5 s.
03:33 — ℹ️ Délégation : inventaires assets/dépendances/chaînes faits par Opus directement (repo de 2 300 lignes, 20 assets : lancer des sous-agents Haiku aurait coûté plus de temps que la lecture).
03:34 — ✅ Checkpoint Fable 1 : diagnostic validé, architecture précisée (voir DECISIONS).
➡️ Spike Keystatic (compat Next 16 / React 19).
03:48 — ✅ Spike Keystatic OK (Next 16.4.6 / React 19.3.1), contenu migré en YAML, aller-retour admin vérifié (seul le champ édité change), admin 404 en prod. Checkpoint Fable 2 : direction A « Carton de générique » verrouillée (DESIGN.md). Plancher JS framework mesuré : 129 kB gzip / 108 kB brotli.
➡️ Phase 2 : tokens, polices, layout, nav, routes FR/EN, visibilité.
03:57 — ✅ Nouveau site construit (accueil, liste projets, pages projet, pages libres, 404) en FR et EN, build + lint verts, poussé. Opus seul (structure + design system + nav = périmètre réservé au builder principal).
➡️ SEO (sitemap/robots/OG), redirections des anciennes URL, transitions de page, test CMS création/suppression, test visibilité.
04:02 — ✅ SEO (sitemap/robots/hreflang/OG générées), redirections v1, transitions de page CSS. Tests : parcours CMS créer→voir→supprimer OK (6,8 s robot) ; bascule de visibilité testée sur build prod (masquée = 404/hors nav/hors sitemap, publiée = 200/en nav/en sitemap) ; 21 tests Playwright verts. ⚠️ Bug trouvé par les tests : débordement horizontal mobile (bande d'affiches) → corrigé.
➡️ Lighthouse + perf.
04:07 — ✅ Lighthouse mobile (local) : home Perf 97 / A11y 100 / BP 100 / SEO 100, page projet 99/100/100/100, CLS 0, TBT ≤ 90 ms. LCP observé = FCP (~0,15 s), LCP simulé 2,5 s avec l'ident / 1,9 s sans. JS 119 kB brotli (plancher framework 108). ⚠️ LCP simulé > 1,8 s : à arbitrer au checkpoint 3.
➡️ Screenshots mid + checkpoint Fable 3.
04:16 — ✅ Haiku : rapport de parité FR/EN (0 champ manquant, 4 divergences factuelles → INCOHERENCES.md ; 1 divergence introduite par moi dans le titre SEO EN, corrigée). ⚠️ Tag `pre-redesign` : push refusé par le proxy (403), il existe en local seulement → rollback documenté sur le commit a821386 (= main actuel).
04:18 — ✅ Checkpoint Fable 3 traité (voir DECISIONS 19-22). Sonnet (worktree) : script de capture du motion + 60 images dans screenshots/motion — l'ident joue une seule fois, se coupe à ~1,1 s, révélations OK, pas de contenu bloqué à opacity 0. Relu et intégré par Opus. Passe design : projets en 2 niveaux, manifeste en carton clair, Gloock réservé aux titres, hero sans chevauchement, CTA 489 restauré.
04:23 — ✅ Protocole LCP (ident ON/OFF × 3 runs × simulé/appliqué) : l'ident ne change rien ; LCP appliqué ≈ 1,3 s (cible < 1,8 s OK), simulé ≈ 2,5 s (artefact Lantern, LCP observé 0,16 s). Ident conservé.
04:25 — ✅ Tests ajoutés (ancres EN sans rechargement, barre à 6 onglets à 1024 px, état « aucun jeu »). ⚠️ Bug trouvé : à 6 onglets la barre desktop débordait à 1024 px → mode Menu entre 1024 et 1280 px. Tous verts.
04:30 — ✅ REVIEW.md complet (version provisoire, métriques et screenshots « after » à rafraîchir au gel). README du repo réécrit.
➡️ Revue Fable post-passe design, puis backlog de polish.
04:39 — ✅ Revue DA par sous-agent Fable (advisor indisponible) : 7 corrections + 4 détails appliqués, 22 tests verts.
04:44 — ⚠️ Régression trouvée par Lighthouse : CLS 0,16 sur la page POSTMERIDIAN (fil d'Ariane qui passait sur 2 lignes avant le chargement de la police) → corrigé (CLS 0,001) ; max-width des titres en em au lieu de ch. Lighthouse after : 96–98 / 100 / 100 / 100 sur 4 pages.
11:07 — ✅ Checkpoint 4 lancé : rebuild, screenshots after (375/768/1024/1440) régénérés, lint + prettier + 22 tests e2e verts. Revue finale Fable (sous-agent lecture seule) en cours.
11:15 — ✅ Checkpoint Fable 4 : GO. 3 corrections CSS + 4 coquilles/casse appliquées, REVIEW.md rendu plus exact (DECISIONS 25). Build, lint, prettier, 22 tests e2e verts. Lighthouse final : home 97/100/100/100, page projet 96/100/100/100, CLS 0,001. Screenshots after régénérés.
11:46 — 🧊 GEL. Build et lint verts, arbre propre, branche `redesign/v2` poussée (miroir `claude/affectionate-planck-jlw1yu`). Rien sur `main`, rien déployé. Plus aucune modification de code. Lire docs/redesign/REVIEW.md.
17:36 — ✅ (session 2) Faits corrigés selon Hugo : POSTMERIDIAN fondé en avril 2024 à Montpellier ; 8 ans en production audiovisuelle + 2 ans en production de jeux vidéo. Blocs des pages libres : champ « Liens » (pour Instagram etc. sur Personal brand). Djogo reste masqué.
➡️ Bascule FR/EN sans rechargement + navigation sans rechargement ; LCP.
17:46 — ✅ Navigation et bascule FR/EN sans rechargement (racine unique [lang] + rewrites + next/link). Parcours complet testé : 1 seul document chargé, <html lang> suit, position gardée au changement de langue, ident jamais rejoué. 2 bugs trouvés et corrigés en route (ident réapparaissant, retour accueil mal positionné). 25 tests verts. JS +3 kB gzip.
➡️ Temps d'affichage (LCP).
18:07 — ✅ LCP mobile : le nom devient l'élément principal → 1,4 s → 1,0 s (throttling appliqué). Police de texte allégée (35 → 27 kB). Back-office testé (créer → voir → supprimer OK), bascule de visibilité testée sur build prod (FR et /en). ⚠️ Bug trouvé dans le script de test de visibilité (restaurait d'anciennes copies) → corrigé, contenu restauré. REVIEW.md § 0 « Session 2 » rédigé.
➡️ Revue Fable de la session 2.
18:19 — ✅ Revue Fable session 2 : 2 bugs (liens de langue sur la 404 ; rewrites vs suffixes .rsc de Vercel) + 5 points corrigés. Préchargement uniquement à l'intention (0 requête de fond). Mesures finales : mobile LCP 1,0 s (throttling appliqué), desktop score 100 / LCP 0,5–0,6 s. 28 tests verts.
20:14 — 🚀 MISE EN LIGNE sur demande de Hugo : `main` avancé en fast-forward a821386 → 6bbd119 (build, lint, 28 tests verts juste avant). Vercel déploie `main` automatiquement. Retour arrière : Vercel › Deployments › redéployer le déploiement de a821386, ou `git revert`.
➡️ Migration vers Astro (demandée par Hugo) sur la branche `astro`, sans toucher au site en ligne.
20:35 — ✅ (session 3) Migration Astro terminée sur la branche `astro` : même rendu, 28 tests verts, back-office OK, build Vercel OK. Lighthouse mobile : score 99–100, LCP simulé 1,66 s (Next : 2,2–2,7), JS 5 kB (Next : 142). En attente du feu vert de Hugo pour la mise en ligne.
