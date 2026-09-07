#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/01_site_atual_originais"
mkdir -p "$OUT"
curl -fL 'https://drembelem.com.br/assets/images/dr-mauricio-hero-authoridade.png' -o "$OUT/dr-mauricio-hero-authoridade.png"
curl -fL 'https://drembelem.com.br/assets/images/editorial-performance.jpg' -o "$OUT/editorial-performance.jpg"
curl -fL 'https://drembelem.com.br/assets/images/editorial-consultation.jpg' -o "$OUT/editorial-consultation.jpg"
curl -fL 'https://drembelem.com.br/assets/images/article-rotina.png' -o "$OUT/article-rotina.png"
curl -fL 'https://drembelem.com.br/assets/images/article-performance.png' -o "$OUT/article-performance.png"
echo 'Originais baixados com sucesso.'
