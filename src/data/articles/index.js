// src/data/articles/index.js
import tecnicasRespiracao from "./emocional/tecnicas-respiracao";
import introducaoMeditacao from "./emocional/introducao-meditacao";
import autocontroleEmocional from "./emocional/autocontrole-emocional";
import fortalecimentoOmbro from "./fisico/fortalecimento-ombro";
import fortalecimentoJoelho from "./fisico/fortalecimento-joelho";
import fortalecimentoQuadril from "./fisico/fortalecimento-quadril";

const articles = [
  { ...tecnicasRespiracao, friendlySlug: "tecnicas-respiracao" },
  { ...introducaoMeditacao, friendlySlug: "introducao-meditacao" },
  { ...autocontroleEmocional, friendlySlug: "auto-controle" },
  { ...fortalecimentoOmbro, friendlySlug: "fortalecimento-ombro" },
  { ...fortalecimentoJoelho, friendlySlug: "fortalecimento-joelho" },
  { ...fortalecimentoQuadril, friendlySlug: "fortalecimento-quadril" },
];

const articlesData = {};
articles.forEach(article => {
  articlesData[article.slug] = article;
  articlesData[article.friendlySlug] = article;
});

// ✅ exportando os dois formatos
export const articlesArray = articles;
export default articlesData;
