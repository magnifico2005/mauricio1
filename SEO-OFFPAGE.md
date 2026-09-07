# SEO Off-Page — drembelem.com.br

Plano de autoridade e presença externa para Dr. Mauricio Neiva (CRM-PA 7735 · Clínica Geral),
complementar ao SEO on-page já implementado no site. Este documento é um plano de execução, não um
serviço automatizado — cada item exige ação humana (cadastro, verificação, revisão de conteúdo).

## Princípios

- Toda menção externa deve refletir **exatamente** o que está publicado no site: nome, CRM, endereço,
  especialidade ("Clínica Geral", sem "especialista" até confirmação de RQE).
- Nenhuma tática aqui deve violar a Resolução CFM nº 2.336/2023 (nada de "melhor médico",
  depoimentos de pacientes com antes/depois, promessa de resultado, etc.).
- **Proibido**: compra de backlinks, PBN (redes privadas de blogs), diretórios spam, comentários
  automáticos, troca de link em massa, qualquer ferramenta de "geração automática de backlinks".

## 1. Google Business Profile

- Criar/reivindicar o perfil com o nome exato usado no site: **Dr. Mauricio Neiva**.
- Categoria: Clínico geral / Consultório médico.
- Endereço idêntico ao do site: Rodovia Augusto Montenegro, Edifício Parque Office, Sala 409 —
  Medical Working, Torre Norte, Belém — PA. **Confirmar o endereço fisicamente antes de publicar.**
- Site: `https://drembelem.com.br`.
- Horário de atendimento: preencher apenas quando confirmado (o site atual não define horário fixo,
  apenas "mediante agendamento").
- Não solicitar nem incentivar avaliações com linguagem que prometa resultado — pedir apenas
  feedback sobre a experiência de atendimento.

## 2. Google Search Console

- Verificar a propriedade (ver README.md).
- Enviar `sitemap.xml`.
- Monitorar mensalmente: cobertura de indexação, Core Web Vitals (relatório de experiência),
  consultas de pesquisa (para identificar novas intenções de busca locais).

## 3. Bing Webmaster Tools

- Repetir o processo do Search Console (importação direta a partir do Google Search Console é
  suportada pela ferramenta da Microsoft).

## 4. Consistência NAP (Nome, Endereço, Telefone/WhatsApp)

Manter idêntico em todos os canais:

- Nome: Dr. Mauricio Neiva
- Endereço: exatamente como em `src/_data/site.js`
- WhatsApp: o mesmo número usado no site

Canais a atualizar quando o site for publicado: Google Business Profile, Instagram (bio),
diretórios médicos legítimos (ver item 5).

## 5. Diretórios médicos legítimos

Priorizar diretórios de saúde reconhecidos e gratuitos, sem pagamento por posicionamento
duvidoso, por exemplo: diretórios de convênios/planos de saúde nos quais o médico já atua,
e diretórios médicos amplamente usados no Brasil. Antes de cadastrar em qualquer diretório novo,
confirmar que os dados exibidos (CRM, especialidade) são iguais aos do site.

## 6. Instagram (@mauricioneivafernandes)

- Bio com link para o site (ou para uma página específica, ex.: `/contato/`).
- Conteúdo alinhado ao editorial do site: sem promessa de resultado, sem antes/depois.
- Linkar posts relevantes aos artigos do blog quando fizer sentido (ex.: um post sobre sono pode
  linkar ao artigo sobre rotina).

## 7. Backlinks editoriais (link building ético)

- Entrevistas ou colunas em veículos de saúde/local de Belém — como fonte médica citada, com
  link para o site.
- Parcerias legítimas com profissionais complementares (educadores físicos, nutricionistas,
  fisioterapeutas) — menção mútua em conteúdo genuíno, nunca troca de link em massa.
- Participação em eventos, podcasts ou matérias locais sobre saúde, emagrecimento ou performance.

## 8. Menções locais (citations)

- Garantir presença consistente em serviços de mapas e busca local (Google Maps, Bing Maps, Apple
  Maps via cadastro no respectivo portal).
- Monitorar menções ao nome do médico e do consultório para garantir que os dados estejam corretos.

## 9. Conteúdo como ativo de autoridade (E-E-A-T)

- Manter os artigos do blog com revisão médica periódica (atualizar `dateModified` no front matter
  quando revisado).
- Adicionar novas referências científicas verificáveis conforme o tema evoluir — nunca inventar
  DOI, PMID ou estatística (ver README.md, seção "Como criar um novo artigo").

## Cadência sugerida

| Frequência | Ação |
|---|---|
| Semanal | Responder comentários/mensagens no Instagram e Google Business Profile |
| Mensal | Revisar Search Console (cobertura, CWV, consultas) |
| Trimestral | Revisar 1–2 artigos existentes; publicar 1 artigo novo com referências atualizadas |
| Semestral | Auditar consistência NAP em todos os canais externos |
