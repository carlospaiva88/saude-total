// src/data/articles/index.js
// Arquivo completo e atualizado — normaliza slugs, category/subCategory, date e excerpt
// Mantive suas importações e adicionei um passo de normalização centralizado.
// Exports:
//  - default: articlesData (map por slug/friendlySlug -> artigo)
//  - articlesArray: array normalizado de artigos

/* -------------------------
   IMPORTS (seus arquivos)
   ------------------------- */
import tecnicaRespiracao from "./emocional/tecnicas-respiracao";
import introducaoMeditacao from "./emocional/introducao-meditacao";
import autoControleEmocional from "./emocional/auto-controle-emocional";
import relacionamentosEmocionais from "./emocional/lidando-com-relacionamentos-emocionais";
import bemEstarEmocional from "./emocional/estrategias-para-bem-estar-emocional";
import lidandoComLuto from "./emocional/lidando-com-o-luto";

import fortalecimentoOmbro from "./fisico/fortalecimento-ombro";
import fortalecimentoJoelho from "./fisico/fortalecimento-joelho";
import fortalecimentoQuadril from "./fisico/fortalecimento-quadril";
import fortalecimentoPunho from "./fisico/fortalecimento-punho";
import fortalecimentoArticulacoes from "./fisico/fortalecimento-articulacoes";
import posturaCorreta from "./fisico/postura-correta";

import entendendoAnsiedade from "./mental/entendendo-ansiedade";
import compreendendoDepressao from "./mental/compreendendo-depressao";
import disturbiosDoSono from "./mental/disturbios-do-sono";
import tecnicasParaAliviarEstresse from "./mental/tecnicas-para-aliviar-estresse";
import autoconhecimentoParaSaudeMental from "./mental/autoconhecimento-para-saude-mental";
import mindfulness from "./mental/mindfulness";
import sintomasAnsiedade from "./mental/sintomas-ansiedade";
import meditacaoBasica from "./mental/meditacao-basica";
import meditacaoAvancada2 from "./mental/meditacao-avancada2";
import sintomasDepressao from "./mental/sintomas-fisicos-depressao";


import autoestimaEspiritual from "./espiritual/autoestima-espiritual";
import meditacaoAvancada from "./espiritual/meditacao-avancada";
import energiaPositiva from "./espiritual/energia-positiva";
import poderGratidao from "./espiritual/poder-gratidao";
import equilibrioEspiritual from "./espiritual/equilibrio-espiritual-diario";

/* -------------------------
   HELPERS DE NORMALIZAÇÃO
   ------------------------- */
function slugify(s = "") {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toISODate(d) {
  if (!d) return "";
  // aceita dd/mm/yyyy
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split("/");
    return `${yyyy}-${mm}-${dd}`;
  }
  const parsed = new Date(d);
  if (!isNaN(parsed)) return parsed.toISOString().split("T")[0];
  return d;
}

function stripHtml(html = "") {
  return String(html || "").replace(/<[^>]+>/g, "").replace(/s+/g, " ").trim();
}

function excerptFromContent(article, max = 160) {
  const raw =
    article.excerpt ||
    article.description ||
    article.descricao ||
    (article.content ? stripHtml(article.content) : "");
  const text = String(raw || "").trim().replace(/\s+/g, " ");
  return text.length > max ? text.slice(0, max - 1).trim() + "…" : text;
}

/* -------------------------
   RAW ARTICLES (mantive seus friendlySlug)
   ------------------------- */
const rawArticles = [
  // emocional
  { ...tecnicaRespiracao, friendlySlug: "tecnicas-respiracao" },
  { ...introducaoMeditacao, friendlySlug: "introducao-meditacao" },
  { ...autoControleEmocional, friendlySlug: "auto-controle-emocional" },
  { ...relacionamentosEmocionais, friendlySlug: "lidando-com-relacionamentos-emocionais" },
  { ...bemEstarEmocional, friendlySlug: "estrategias-para-bem-estar-emocional" },
  { ...lidandoComLuto, friendlySlug: "lidando-com-o-luto" },

  // fisica
  { ...fortalecimentoOmbro, friendlySlug: "fortalecimento-ombro" },
  { ...fortalecimentoJoelho, friendlySlug: "fortalecimento-joelho" },
  { ...fortalecimentoQuadril, friendlySlug: "fortalecimento-quadril" },
  { ...posturaCorreta, friendlySlug: "postura-correta" },
  { ...fortalecimentoPunho, friendlySlug: "fortalecimento-punho" },
  { ...fortalecimentoArticulacoes, friendlySlug: "fortalecimento-articulacoes" },

  // mental
  { ...entendendoAnsiedade, friendlySlug: "entendendo-ansiedade" },
  { ...compreendendoDepressao, friendlySlug: "compreendendo-depressao" },
  { ...disturbiosDoSono, friendlySlug: "disturbios-do-sono" },
  { ...tecnicasParaAliviarEstresse, friendlySlug: "tecnicas-para-aliviar-estresse" },
  { ...autoconhecimentoParaSaudeMental, friendlySlug: "autoconhecimento-para-saude-mental" },
  { ...mindfulness, friendlySlug: "mindfulness-para-saude-mental" },
  { ...sintomasAnsiedade, friendlySlug: "sintomas-ansiedade" },
  { ...meditacaoBasica, friendlySlug: "meditacao-basica" },
  { ...meditacaoAvancada2, friendlySlug: "meditacao-avancada-praticas" },
  { ...sintomasDepressao, friendlySlug: "sintomas-fisicos-depressao"},


  // espiritual
  { ...autoestimaEspiritual, friendlySlug: "autoestima-espiritual" },
  { ...meditacaoAvancada, friendlySlug: "meditacao-avancada" },
  { ...energiaPositiva, friendlySlug: "energia-positiva" },
  { ...poderGratidao, friendlySlug: "gratidao-proposito" },
  { ...equilibrioEspiritual, friendlySlug: "equilibrio-espiritual-diario" },
];

/* -------------------------
   NORMALIZAÇÃO
   ------------------------- */
const seenSlugs = new Set();
const articles = rawArticles.map((a, idx) => {
  const article = { ...a };

  // ID: garante um id único (não obrigatório, mas útil)
  if (!article.id) {
    article.id = slugify(article.slug || article.friendlySlug || article.title || `article-${idx + 1}`);
  }

  // slug: prioriza slug -> friendlySlug -> title -> id
  if (!article.slug) {
    article.slug = slugify(article.friendlySlug || article.title || article.id);
  } else {
    article.slug = slugify(article.slug);
  }

  // friendlySlug: normaliza se existir
  if (article.friendlySlug) article.friendlySlug = slugify(article.friendlySlug);

  // category: normaliza de vários campos possíveis
  if (article.category) {
    article.category = slugify(article.category);
  } else if (article.categoria) {
    article.category = slugify(article.categoria);
  } else {
    // fallback vazio — marque para revisão posterior se necessário
    article.category = article.category || "";
  }

  // subCategory: unifica em camelCase 'subCategory' (origens possíveis: subcategory, subcategoria, subCategory, sub)
  article.subCategory = slugify(
    article.subCategory || article.subcategoria || article.subcategory || article.sub || ""
  );

  // date -> ISO YYYY-MM-DD quando possível
  if (article.date) {
    article.date = toISODate(article.date);
  } else if (article.publishedAt) {
    article.date = toISODate(article.publishedAt);
  } else {
    article.date = article.date || "";
  }

  // excerpt padronizado para listagens
  article.excerpt = excerptFromContent(article, 160);

  // featured boolean
  article.featured = Boolean(article.featured);

  // readingTime fallback
  article.readingTime = article.readingTime || article.tempo || article.readingTime || "";

  // evita slugs duplicados (anexa sufixo incremental)
  let base = article.slug || `article-${idx + 1}`;
  let candidate = base;
  let i = 2;
  while (seenSlugs.has(candidate)) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  article.slug = candidate;
  seenSlugs.add(article.slug);

  return article;
});

/* -------------------------
   MONTAGEM DO MAP (articlesData)
   ------------------------- */
// Mapa por slug e por friendlySlug (mantém compatibilidade com possíveis links antigos)
const articlesData = {};
articles.forEach((article) => {
  if (!article || !article.slug) return;
  articlesData[article.slug] = article;
  if (article.friendlySlug && article.friendlySlug !== article.slug) {
    articlesData[article.friendlySlug] = article;
  }
});

/* -------------------------
   EXPORTS
   ------------------------- */
export const articlesArray = articles;
export default articlesData;
