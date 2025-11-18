// src/data/receitas/index.js
import panquecaBananaAveia from "./fitness/panqueca-banana-aveia";
import smothieVerdeDetox from "./fitness/smothie-verde-detox";
import frangoGrelhadoErvas from "./fitness/frango-grelhado-ervas";
import saladaMediterranea from "./fitness/salada-mediterranea";
import pastaIntegralPesto from "./fitness/pasta-integral-pesto";
import overnightOats from "./fitness/overnight-oats";

import tacosDePeixe from "./salgadas/tacos-peixe";
import wrapDeAtum from "./salgadas/wrap-de-atum";

import mousseChocolateFit from "./doces/mousse-chocolate-fit";
import cheesecakeFramboesa from "./doces/cheesecake-framboesa";

// -------------------------------------------------------
// Normalizador: garante consistência nos dados
// -------------------------------------------------------
function normalizeRecipe(recipe, categoriaPrincipal) {
  return {
    ...recipe,
    slug:
      recipe.slug ||
      recipe.titulo
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]/g, ""),
    categoriaPrincipal,
    descricaoCurta:
      recipe.descricaoCurta ||
      recipe.descricao ||
      recipe.excerpt ||
      "Veja os detalhes desta receita saudável.",
    calorias: recipe.calorias || null,
    tempo: recipe.tempo || null,
  };
}

// -------------------------------------------------------
// Coleções organizadas por categorias
// -------------------------------------------------------
const receitasFitness = [
  panquecaBananaAveia,
  smothieVerdeDetox,
  frangoGrelhadoErvas,
  saladaMediterranea,
  pastaIntegralPesto,
  overnightOats,
].map(r => normalizeRecipe(r, "fitness"));

const receitasSalgadas = [
  tacosDePeixe,
  wrapDeAtum,
].map(r => normalizeRecipe(r, "salgadas"));

const receitasDoces = [
  mousseChocolateFit,
  cheesecakeFramboesa,
].map(r => normalizeRecipe(r, "doces"));

// -------------------------------------------------------
// Index principal
// -------------------------------------------------------
const receitas = {
  fitness: receitasFitness,
  salgadas: receitasSalgadas,
  doces: receitasDoces,
};

// -------------------------------------------------------
// Funções utilitárias para BlogPage / ReceitasPage
// -------------------------------------------------------

// Todas as receitas unificadas
export function getAllReceitas() {
  return [
    ...receitasFitness,
    ...receitasSalgadas,
    ...receitasDoces,
  ];
}

// Receitas por categoria principal
export function getReceitasByCategoriaPrincipal(cat) {
  return getAllReceitas().filter(r => r.categoriaPrincipal === cat);
}

// Pegar receita pelo slug
export function getReceitaBySlug(slug) {
  return getAllReceitas().find(r => r.slug === slug);
}

// Gerar recomendações automáticas
export function getReceitasRecomendadas(slug, limit = 3) {
  const todas = getAllReceitas();
  const atual = todas.find(r => r.slug === slug);

  if (!atual) return todas.slice(0, limit);

  return todas
    .filter(r => r.slug !== slug && r.categoriaPrincipal === atual.categoriaPrincipal)
    .slice(0, limit);
}

export default receitas;
