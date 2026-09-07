$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$OriginalDir = Join-Path $Root "01_site_atual_originais"
$WebDir = Join-Path $Root "02_site_atual_web"
New-Item -ItemType Directory -Force -Path $OriginalDir, $WebDir | Out-Null

$assets = @(
  @{ name="dr-mauricio-hero-authoridade"; ext="png"; url="https://drembelem.com.br/assets/images/dr-mauricio-hero-authoridade.png"; widths=@(480,720,960,1280); qwebp=84; qavif=60 },
  @{ name="editorial-performance"; ext="jpg"; url="https://drembelem.com.br/assets/images/editorial-performance.jpg"; widths=@(480,800,1200); qwebp=82; qavif=58 },
  @{ name="editorial-consultation"; ext="jpg"; url="https://drembelem.com.br/assets/images/editorial-consultation.jpg"; widths=@(480,800,1200); qwebp=82; qavif=58 },
  @{ name="article-rotina"; ext="png"; url="https://drembelem.com.br/assets/images/article-rotina.png"; widths=@(480,800,1200); qwebp=82; qavif=58 },
  @{ name="article-performance"; ext="png"; url="https://drembelem.com.br/assets/images/article-performance.png"; widths=@(480,800,1200); qwebp=82; qavif=58 }
)

Write-Host "Baixando os ativos originais de drembelem.com.br..." -ForegroundColor Cyan
foreach ($a in $assets) {
  $dest = Join-Path $OriginalDir ($a.name + "." + $a.ext)
  Write-Host ("  -> " + $a.name)
  Invoke-WebRequest -Uri $a.url -OutFile $dest -UseBasicParsing
  if ((Get-Item $dest).Length -lt 1000) { throw "Arquivo muito pequeno/possivelmente inválido: $dest" }
}

$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
  Write-Host "" 
  Write-Host "Originais baixados com sucesso." -ForegroundColor Green
  Write-Host "ImageMagick não encontrado; as versões WebP/AVIF não foram geradas." -ForegroundColor Yellow
  Write-Host "Os originais já podem ser usados ou convertidos posteriormente."
  exit 0
}

Write-Host "" 
Write-Host "Gerando variantes WebP e AVIF..." -ForegroundColor Cyan
foreach ($a in $assets) {
  $src = Join-Path $OriginalDir ($a.name + "." + $a.ext)
  foreach ($w in $a.widths) {
    $webp = Join-Path $WebDir ($a.name + "-" + $w + "w.webp")
    $avif = Join-Path $WebDir ($a.name + "-" + $w + "w.avif")
    & magick $src -auto-orient -strip -resize ("${w}x>") -quality $a.qwebp $webp
    & magick $src -auto-orient -strip -resize ("${w}x>") -quality $a.qavif $avif
  }
}
Write-Host "" 
Write-Host "Concluído. Originais e versões web estão prontos." -ForegroundColor Green
