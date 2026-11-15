#!/usr/bin/env bash
# Mesure LCP home : ident activé vs désactivé, 3 runs chacun, throttling simulé (défaut) et appliqué (devtools).
# Rebuild entre les deux états. Résultats → docs/redesign/metrics/lcp-protocol.txt
set -euo pipefail
cd "$(dirname "$0")/../.."
LH=${LH:-npx lighthouse}
out=docs/redesign/metrics/lcp-protocol.txt; : > "$out"
measure() {
  local label=$1
  pkill -f "next-server" || true; sleep 1
  npm run build >/dev/null; (npx next start -p 3100 >/dev/null 2>&1 &); sleep 4
  curl -s -o /dev/null http://localhost:3100/; curl -s -o /dev/null "http://localhost:3100/_next/image?url=%2Fimages%2Fsite%2Fportrait.jpg&w=384&q=60"
  for method in simulate devtools; do
    for i in 1 2 3; do
      f=$(mktemp --suffix=.json)
      $LH http://localhost:3100/ --chrome-path=/opt/pw-browsers/chromium --chrome-flags="--headless=new --no-sandbox" \
        --only-categories=performance --throttling-method=$method --output=json --output-path="$f" --quiet >/dev/null 2>&1
      node -e "const a=require('$f').audits,m=a.metrics.details.items[0];console.log('$label $method run$i  perf',Math.round(require('$f').categories.performance.score*100),' LCP',m.largestContentfulPaint,'ms  FCP',m.firstContentfulPaint,'ms  obsLCP',m.observedLargestContentfulPaint,'ms')" | tee -a "$out"
      rm "$f"
    done
  done
}
cp content/site.yaml /tmp/site.yaml.bak; trap 'cp /tmp/site.yaml.bak content/site.yaml' EXIT
sed -i 's/^introEnabled: .*/introEnabled: true/' content/site.yaml; measure "ident=ON "
sed -i 's/^introEnabled: .*/introEnabled: false/' content/site.yaml; measure "ident=OFF"
