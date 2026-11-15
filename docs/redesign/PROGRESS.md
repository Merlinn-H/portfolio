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
