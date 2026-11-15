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
