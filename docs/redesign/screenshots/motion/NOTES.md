# Capture du mouvement (reducedMotion: no-preference)

Script : `scripts/redesign/motion-capture.cjs` (375x812 et 1440x900, contexte neuf par viewport).

## Ident d'intro
- Joue bien à la première visite : calque plein écran sombre (la page est visible très atténuée dessous), logo « 489 Productions » révélé par un wipe de gauche à droite (0 ms : seul le « 4 » et « PR » sont visibles ; 500 ms : logo complet crème).
- Vers 1000-1100 ms le logo passe au rouge accent (même cadrage), puis l'overlay disparaît avant 1500 ms : la page (hero) est nette et le portrait est affiché à 1500 ms.
- Sondes JSON `[data-intro-overlay]` : 0 ms = false (artefact : document pas encore commité à t=0, voir captures), 600 ms = true, 1300 ms = false, sur les deux viewports. L'overlay ne reste donc pas bloqué.
- Le logo est identique (centré, taille fixe) en 375 et 1440 ; rien de cassé observé.

## Rechargement dans la même session
- `documentElement.dataset.intro === 'off'` après reload : true (375 et 1440). L'ident ne rejoue pas (overlay absent à 0 et 300 ms).
- À 0 ms de la reprise, le cadre du portrait est encore un aplat sombre (image pas encore décodée) : léger « pop-in » du portrait, pas de FOUC de texte (polices présentes).

## Scroll (animation-timeline: view())
- 32 pas (375) et 35 pas (1440) ; captures tous les 3 pas : textes, lignes du parcours et titres sont révélés quand ils entrent dans le viewport, rien de coupé.
- Contrôle automatisé en fin de scroll : aucun élément textuel resté à opacity 0 sur mobile ; sur desktop seuls 5 `span` de classe `*_arrow` (flèches des lignes de projets) sont à opacity 0, ce qui semble être l'état de repos avant survol (flèche visible sur la ligne survolée).
- Barre de navigation flottante : sur mobile elle recouvre le texte en bas de viewport (pilule « Hugo Pezzo / MENU »), comportement attendu.

## Transition vers /projets/…
- Le clic aboutit sur `/projets/489productions`. Les captures à 0, 150 et 300 ms montrent la liste « Projets » (page intermédiaire ?), celle à 600 ms la fiche 489Productions : la View Transition est trop rapide pour être échantillonnée proprement par captures d'écran (le premier cliché arrive après le début du changement de page). Pas d'écran blanc ni de flash observé.
- À confirmer : pourquoi la liste apparaît avant la fiche (double navigation ou lien d'accueil vers la liste).

## Anomalies
- Aucune réelle : pas de rejeu de l'ident, pas d'overlay persistant, pas de contenu invisible après scroll.
- Limite de la méthode : t=0 est capturé avant le premier paint (retry de 25 ms), les timings sont à ±50 ms.
