# drembelem.com.br — novo site

Site de Dr. Mauricio Neiva (CRM-PA 7735 · Clínica Geral), reconstruído como um projeto editorial
premium. Gerado como **HTML/CSS/JS estático** — sem Node, PHP ou banco de dados em produção — pronto
para upload via FTP/cPanel na HostGator.

## Stack

- **[Eleventy (11ty)](https://www.11ty.dev/)** — gerador de site estático. Roda só em build-time; o
  resultado final em `_site/` é HTML/CSS/JS puro.
- **Nunjucks** — linguagem de template dos arquivos `.njk`.
- **[sharp](https://sharp.pixelplumbing.com/)** — usado apenas pelo script `scripts/process-images.mjs`
  para gerar AVIF/WebP/JPG responsivos a partir dos originais. Não roda em produção.
- Sem framework de front-end (React, Vue etc.) e sem biblioteca de animação — JS nativo
  (`IntersectionObserver`, Web Animations/CSS transitions).

## Estrutura

```
src/                        código-fonte (o que você edita)
  _data/
    site.js                 dados centrais: WhatsApp, endereço, CRM, RQE, Instagram, analytics
    imageMeta.json           gerado automaticamente por scripts/process-images.mjs — não editar à mão
  _includes/
    layouts/base.njk         layout HTML base (head, header, footer, scripts)
    partials/                header, footer, whatsapp flutuante, schema JSON-LD, consentimento
    macros/picture.njk       gera <picture> responsivo (AVIF/WebP/JPG) a partir do nome do ativo
  assets/
    css/style.css            design system completo (tokens, componentes)
    js/main.js                menu, reveal on scroll, FAQ, formulário -> WhatsApp, analytics stub
    fonts/                    Fraunces + Inter (self-hosted, variable, subset latin)
    images/                  gerado por scripts/process-images.mjs — não editar à mão
  index.njk                  Home
  sobre/, emagrecimento/, performance/, contato/, faq/, politica-de-privacidade/
  blog/                      Conteúdos + 3 artigos existentes (URLs preservadas)
  404.njk, sitemap.xml.njk, robots.txt, .htaccess, favicon.svg, manifest.webmanifest

assets/images/originals/     as 5 fotos reais baixadas do site atual (arquivos-mestre, não tocar)
scripts/process-images.mjs   gera os responsivos AVIF/WebP/JPG em src/assets/images/
_site/                       SAÍDA do build — é isto que sobe para a HostGator (gerado, não editar)
```

## Como rodar localmente

```bash
npm install
npm run dev
```

Abre um servidor local com live-reload (Eleventy `--serve`).

## Como buildar para produção

```bash
npm run build
```

Isso roda `scripts/process-images.mjs` (gera/atualiza as imagens responsivas) e depois o Eleventy.
O resultado final fica em `_site/`.

## Como publicar na HostGator

1. Rode `npm run build`.
2. Envie **todo o conteúdo de dentro de `_site/`** (não a pasta em si) para `public_html/` via
   FTP ou o Gerenciador de Arquivos do cPanel.
3. Confirme que `.htaccess` foi enviado (alguns clientes FTP escondem arquivos que começam com ponto —
   habilite "mostrar arquivos ocultos").
4. Acesse `https://drembelem.com.br/` e confirme HTTPS ativo (o `.htaccess` força redirecionamento).

Não é necessário Node, PHP ou banco de dados no servidor — apenas Apache servindo arquivos estáticos.

## Onde alterar dados de contato / CRM / RQE

Tudo fica centralizado em **`src/_data/site.js`**:

- **WhatsApp**: campo `whatsapp.number` (formato `55` + DDD + número, só dígitos). Usado no botão
  flutuante, nos CTAs e no formulário de contato.
- **Endereço**: objeto `address` — usado no rodapé, na página de contato e no mapa incorporado.
- **CRM**: campo `crm`.
- **RQE / especialidade**: campo `rqe` (vazio por padrão) e `specialty`. **Só preencha `rqe` e altere
  a palavra "especialista" em algum texto se houver confirmação oficial de Registro de Qualificação
  de Especialista no CRM-PA.** Enquanto vazio, o site apresenta o profissional apenas como
  "Clínica Geral", conforme a Resolução CFM nº 2.336/2023.
- **Instagram**: objeto `instagram`.

Depois de editar, rode `npm run build` novamente.

## Como conectar GA4

Por padrão, **nenhum cookie de mensuração é criado** (nenhum GA4 é carregado). Para habilitar:

1. Em `src/_data/site.js`, defina:
   ```js
   analytics: { enabled: true, ga4Id: "G-XXXXXXX" }
   ```
2. Rebuilde o site. Um banner discreto de consentimento passa a aparecer; o GA4 só carrega depois
   que a pessoa clica em "Aceitar" (`src/_includes/partials/consent.njk`).
3. No Google Analytics, cadastre a propriedade com o domínio `drembelem.com.br`.

## Como verificar no Google Search Console

1. Adicione a propriedade `https://drembelem.com.br`.
2. Verifique por **tag HTML** (adicione o `<meta name="google-site-verification">` fornecido pelo
   Google dentro de `src/_includes/layouts/base.njk`, no `<head>`) ou por **arquivo HTML** (coloque o
   arquivo em `src/` para que ele seja copiado para a raiz do site).
3. Envie o sitemap: `https://drembelem.com.br/sitemap.xml` (gerado automaticamente a cada build a
   partir de todas as páginas reais do site).

## Como criar um novo artigo

1. Crie uma pasta em `src/blog/<slug-do-artigo>/index.njk`.
2. Copie o front matter de um artigo existente (`title`, `description`, `category`, `excerpt`,
   `readingTime`, `datePublished`, `dateModified`, `ogImage`, `breadcrumbs`) e o bloco JSON-LD
   `Article` no topo do conteúdo.
3. Escreva o conteúdo dentro de `<div class="article-body">`.
4. **Referências**: adicione a seção `.references` no fim do artigo, sempre com fontes reais e
   verificáveis (Ministério da Saúde, OMS, CFM, ABESO, sociedades médicas, PubMed, Cochrane etc.).
   **Nunca invente estudo, autor, DOI, PMID ou estatística** — se a fonte não puder ser confirmada,
   não publique a referência.
5. O artigo aparece automaticamente na listagem de `/blog/` e no sitemap (a coleção `articles` é
   montada automaticamente a partir da pasta `src/blog/*/`).
6. Peça revisão médica do conteúdo antes de publicar (o rodapé de cada artigo já indica
   "Conteúdo informativo revisado antes da publicação").

## Imagens

- Os 5 arquivos originais reais do site atual estão em `assets/images/originals/` — são o
  arquivo-mestre, não devem ser editados nem substituídos por imagens geradas por IA.
- `npm run images` (ou `npm run build`, que já inclui esse passo) gera AVIF + WebP + JPG em 3–4
  larguras por imagem, dentro de `src/assets/images/`.
- Para usar uma imagem em uma página nova, use a macro:
  ```njk
  {% from "macros/picture.njk" import responsivePicture with context %}
  {{ responsivePicture("nome-do-ativo", "texto alternativo", "sizes", prioridade_bool) }}
  ```
  onde `nome-do-ativo` é a chave em `src/_data/imageMeta.json` (gerada automaticamente).
- Para adicionar uma imagem nova, inclua uma entrada em `scripts/process-images.mjs` (array `jobs`)
  e rode `npm run images`.

## Logos

- `assets/images/originals/logo-mauricio-neiva.png` — marca do médico (usada no header e no rodapé).
- `assets/images/originals/logo-mki.png` — marca da MKI Marketing Médico (usada apenas no crédito
  do rodapé, com link para `mkimarketingmedico.com.br`).
- Ambas são processadas por `npm run images` em AVIF/WebP/PNG (mantendo transparência) via a macro
  `logo(nome, alt, classe)` em `macros/picture.njk`. Para trocar uma logo, substitua o PNG de origem
  (mesmo nome de arquivo) e rode `npm run build`.
- O favicon e os ícones do `manifest.webmanifest` são gerados automaticamente a partir de
  `logo-mauricio-neiva.png`.

## Pendências antes de publicar

- [ ] Confirmar coordenadas exatas do mapa embutido e horários de atendimento.
- [ ] Confirmar RQE oficial no CRM-PA, se aplicável, antes de anunciar qualquer especialidade.
- [ ] Revisão médica final de todo o conteúdo de `/blog/`, `/emagrecimento/` e `/performance/`.
- [ ] Cadastrar Google Search Console e Google Business Profile (ver `SEO-OFFPAGE.md`).
- [ ] Rodar Lighthouse em produção (mobile e desktop) e revisar Core Web Vitals reais.

## Auditoria do site anterior

Um levantamento do site anterior (estrutura, textos, imagens, CRM/RQE) foi conduzido antes da
reconstrução. Achados principais: o site antigo já usava tom sóbrio e sem promessas — conteúdo
reaproveitado e ampliado; o profissional já se apresentava como "Clínica Geral" (sem especialidade
formal); o `sitemap.xml` antigo apontava para URLs com prefixo `/sample/`, incoerente com as páginas
reais — corrigido neste projeto (o novo `sitemap.xml` é gerado automaticamente a partir das páginas
reais).
