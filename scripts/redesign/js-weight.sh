#!/usr/bin/env bash
# Sum gzip and brotli size of every module <script src> referenced by a built page (needs a running server, e.g. `npm run preview`).
# nomodule polyfills are excluded (modern browsers never download them).
# usage: scripts/redesign/js-weight.sh http://localhost:3100/
url=${1:-http://localhost:3100/}; base=$(echo "$url" | grep -o '^https\?://[^/]*')
html=$(curl -s "$url"); gz=0; br=0
for s in $(echo "$html" | grep -o '<script[^>]*src="[^"]*"[^>]*>' | grep -v noModule | sed 's/.*src="//;s/".*//' | sort -u); do
  body=$(mktemp); curl -s "$base$s" -o "$body"
  g=$(gzip -9 -c "$body" | wc -c); b=$(node -e "process.stdout.write(String(require('zlib').brotliCompressSync(require('fs').readFileSync('$body')).length))")
  gz=$((gz+g)); br=$((br+b)); rm "$body"; echo "$g $b $s"
done
echo "TOTAL gzip: $((gz/1024)) kB · brotli: $((br/1024)) kB"
