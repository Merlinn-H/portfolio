#!/usr/bin/env bash
# Médiane de N runs Lighthouse mobile (perf) pour une URL, méthodes simulate + devtools.
# usage: scripts/redesign/lh-median.sh http://localhost:3100/ [runs] [label]
url=$1; n=${2:-3}; label=${3:-}
LH=${LH:-npx lighthouse}
for method in simulate devtools; do
  vals=()
  for i in $(seq 1 "$n"); do
    f=$(mktemp --suffix=.json)
    $LH "$url" --chrome-path=/opt/pw-browsers/chromium --chrome-flags="--headless=new --no-sandbox" \
      --only-categories=performance --throttling-method=$method --output=json --output-path="$f" --quiet >/dev/null 2>&1
    vals+=("$(node -e "const r=require('$f'),m=r.audits.metrics.details.items[0];console.log([m.largestContentfulPaint,m.firstContentfulPaint,Math.round(r.categories.performance.score*100)].join(' '))")")
    rm -f "$f"
  done
  printf '%s\n' "${vals[@]}" | sort -n | sed -n "$(( (n+1)/2 ))p" | awk -v l="$label" -v m="$method" '{printf "%-28s %-9s LCP %5d ms  FCP %5d ms  perf %s\n", l, m, $1, $2, $3}'
done
