# DECISIONS — prises seul pendant la session autonome

Format : décision — raison — comment revenir en arrière.

1. Branche de travail `redesign/v2` (demandée par le brief) ; la session cloud impose aussi `claude/affectionate-planck-jlw1yu` → je pousse le même commit sur les deux branches. — Les deux contraintes sont satisfaites, `main` intact. — Supprimer l'une des branches distantes.
2. Screenshots « avant » pris sur le build local de `pre-redesign` (prod inaccessible via le proxy). — Rendu identique au déploiement. — n/a.
3. Domaine canonique pour le SEO (metadataBase, sitemap, OG) : `https://hugopezzo.fr` (indiqué par Hugo en cours de session). — C'est le domaine public. — Changer `site.url` dans le singleton `site`.
