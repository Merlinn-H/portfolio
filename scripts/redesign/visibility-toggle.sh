#!/usr/bin/env bash
# Teste le basculement de visibilité de bout en bout sur un build de production :
#   1. état actuel (personal-brand masquée) → tests
#   2. on publie la page (même modification que le sélecteur « Statut » de /keystatic) → build → tests inversés
#   3. on remet l'état d'origine.
set -euo pipefail
cd "$(dirname "$0")/../.."
f=content/pages/personal-brand.yaml
cp "$f" /tmp/pb.yaml.bak
trap 'cp /tmp/pb.yaml.bak "$f"; [ -d /tmp/games.bak ] && cp /tmp/games.bak/*.yaml content/games/ || true' EXIT
run() { npm run build >/dev/null && npx playwright test tests/e2e/visibility.spec.ts --trace off; }
echo "== 1. page masquée"; run
echo "== 2. page publiée"; sed -i 's/^status: hidden/status: published/' "$f"; EXPECT_PERSONAL_BRAND=published run
echo "== 3. tous les jeux masqués"; cp /tmp/pb.yaml.bak "$f"; cp -r content/games /tmp/games.bak
sed -i 's/^status: published/status: hidden/' content/games/*.yaml; EXPECT_NO_GAMES=1 run
cp /tmp/games.bak/*.yaml content/games/
echo "== 4. retour à l'état d'origine"; npm run build >/dev/null
echo "OK"
