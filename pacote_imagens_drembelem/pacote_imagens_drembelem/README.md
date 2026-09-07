# Pacote visual — drembelem.com.br

Pacote preparado para a reconstrução do site do Dr. Mauricio Neiva.

## Prioridade absoluta

O retrato oficial usado no site atual é `dr-mauricio-hero-authoridade.png`.
Ele deve ser preservado como fotografia real do médico e **não deve ser substituído por imagem gerada por IA**.

## Como obter os 5 originais diretamente do site

No Windows, dê duplo clique em:

`BAIXAR_IMAGENS.bat`

O script baixa os cinco arquivos diretamente de `drembelem.com.br` para `01_site_atual_originais/` e, se o ImageMagick estiver instalado, também cria WebP e AVIF responsivos em `02_site_atual_web/`.

Também há scripts PowerShell e Bash em `scripts/`.

## Estrutura

- `01_site_atual_originais/` — originais do site existente, baixados pelo script.
- `02_site_atual_web/` — derivados WebP/AVIF para produção.
- `03_referencias_identidade/originais/` — estudos/peças de identidade visual já existentes.
- `03_referencias_identidade/web/` — versões leves dos estudos em WebP/AVIF.
- `exemplos/picture.html` — exemplo de marcação responsiva.
- `manifest.json` — inventário técnico dos ativos.
- `ASSETS_SITE_ATUAL.txt` — URLs canônicas dos cinco arquivos atuais.

## Estratégia de formatos recomendada

### Fotografias

Produção: **AVIF + WebP** usando `<picture>`, mantendo o original apenas como arquivo-mestre/fallback quando necessário.

- AVIF: melhor compressão, qualidade 55–65.
- WebP: fallback moderno, qualidade 80–86.
- PNG/JPG original: arquivo-mestre; não é necessário servir o PNG pesado quando AVIF/WebP estiverem disponíveis.

### Foto do médico / LCP

Não usar `loading="lazy"` na imagem principal do hero.
Usar `fetchpriority="high"`, dimensões explícitas e `srcset`.
Não usar Base64 para esta foto.

### Imagens editoriais abaixo da dobra

Usar `loading="lazy"` e `decoding="async"`.

## Tamanhos recomendados

Foto do médico:
- 480 px
- 720 px
- 960 px
- 1280 px

Demais imagens:
- 480 px
- 800 px
- 1200 px

O script gera os tamanhos sem ampliar uma imagem além de sua resolução original.

## Observação sobre este ZIP

As URLs dos cinco ativos do site foram verificadas e estão incorporadas no pacote. O ambiente usado para montar este ZIP não permite importar os bytes de páginas públicas diretamente para o sistema de arquivos. Por isso, o pacote traz um baixador de um clique que obtém os **arquivos originais diretamente do domínio**, sem reconstrução, screenshot ou alteração do rosto do médico.
