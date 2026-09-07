// Dados centrais do site. Alterar aqui reflete em todo o projeto.
// Ver README.md > "Como alterar dados de contato / CRM / RQE".

module.exports = {
  url: "https://drembelem.com.br",
  name: "Dr. Mauricio Neiva",
  legalName: "Mauricio Neiva Fernandes",

  // CRM confirmado no site atual e em diretório médico independente.
  // RQE: não confirmado em fonte oficial (CRM-PA) durante o levantamento.
  // Preencher apenas se houver confirmação oficial de especialidade/RQE.
  // Enquanto RQE estiver vazio, o site apresenta o profissional como
  // "Clínica Geral" e NÃO usa a palavra "especialista".
  crm: "CRM-PA 7735",
  rqe: "", // ex.: "RQE-PA 12345" — deixar vazio até confirmação oficial
  specialty: "Clínica Geral",

  credential: "Dr. Mauricio Neiva · CRM-PA 7735 · Clínica Geral",

  whatsapp: {
    number: "5591992330707", // (91) 99233-0707
    filled: true,
  },

  instagram: {
    handle: "@mauricioneivafernandes",
    url: "https://instagram.com/mauricioneivafernandes",
  },

  address: {
    street: "Rodovia Augusto Montenegro",
    complement: "Edifício Parque Office, Sala 409 — Medical Working, Torre Norte",
    city: "Belém",
    state: "PA",
    region: "BR-PA",
    country: "BR",
    // Coordenadas não confirmadas — validar antes de publicar mapa embutido.
    lat: null,
    lng: null,
  },

  social: {
    sameAs: ["https://instagram.com/mauricioneivafernandes"],
  },

  // Analytics desativado por padrão (nenhum cookie não essencial é criado
  // até que isto seja habilitado). Ver README > "Como conectar GA4".
  analytics: {
    enabled: false,
    ga4Id: "", // ex.: "G-XXXXXXX"
  },
};
