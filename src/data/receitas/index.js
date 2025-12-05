// src/data/receitas/index.js

import panquecaBananaAveia from "./fitness/panqueca-banana-aveia";
import smothieVerdeDetox from "./fitness/smothie-verde-detox";
import frangoGrelhadoErvas from "./fitness/frango-grelhado-ervas";
import saladaMediterranea from "./fitness/salada-mediterranea";
import pastaIntegralPesto from "./fitness/pasta-integral-pesto";
import overnightOats from "./fitness/overnight-oats";

import tacosDePeixe from "./salgadas/tacos-peixe";
import wrapDeAtum from "./salgadas/wrap-de-atum";

// existentes doces
import mousseChocolateFit from "./doces/mousse-chocolate-fit";
import cheesecakeFramboesa from "./doces/cheesecake-framboesa";

// ---------- NOVAS RECEITAS (importadas) ----------
/* Fitness */
import smoothieProteicoMorangoAveia from "./fitness/smoothie-proteico-morango-aveia";
import omeleteClarasEspinafre from "./fitness/omelete-claras-espinafre";
import bowlEnergeticoIogurte from "./fitness/bowl-energetico-iogurte";

/* Salgadas */
import arrozFrangoLegumes from "./salgadas/arroz-frango-legumes";
import escondidinhoBatataDoce from "./salgadas/escondidinho-batata-doce";
import salmaoLimaoAlho from "./salgadas/salmao-limao-alho";

/* Doces */
import cookiesAveiaChocolate from "./doces/cookies-aveia-chocolate";
import pudimChiaCacau from "./doces/pudim-chia-cacau";
import brownieBatataDoce from "./doces/brownie-batata-doce";

/* Veganas (nova categoria) */
import curryGraoBico from "./veganas/curry-grao-bico";
import hamburguerLentilha from "./veganas/hamburguer-lentilha";
import saladaQuinoaAbacate from "./veganas/salada-quinoa-abacate";
import sopaAboboraCoco from "./veganas/sopaAboboraCoco";
import tofuGrelhadoGergelim from "./veganas/tofuGrelhadoGergelim";
import falafelAssado from "./veganas/falafelAssado";




// -------------------------------------------------------

// -------------------------------------------------------
// Normalizador: garante consistência nos dados
// -------------------------------------------------------
const CATEGORY_LABELS = {
  fitness: "Fitness",
  salgadas: "Salgadas",
  doces: "Sobremesas",
  veganas: "Veganas"
};

function normalizeRecipe(recipe, categoriaPrincipal) {
  const rawTitle = recipe.titulo || recipe.title || "";
  const slug =
    recipe.slug ||
    rawTitle
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  const catKey = (categoriaPrincipal || recipe.categoriaPrincipal || recipe.categoria || recipe.category || "")
    .toString().toLowerCase();

  const calories = recipe.calorias ?? recipe.calories ?? recipe.nutritional?.calories ?? null;
  const protein = recipe.proteina ?? recipe.protein ?? recipe.nutritional?.protein ?? null;
  const carbs = recipe.carboidratos ?? recipe.carbs ?? recipe.nutritional?.carbs ?? null;
  const fat = recipe.gordura ?? recipe.fat ?? recipe.nutritional?.fat ?? null;

  return {
    ...recipe,
    slug,
    categoriaPrincipal: catKey || (categoriaPrincipal || "").toString().toLowerCase(),
    // categoria - rótulo humanizado (sticker) — usa mapping ou capitaliza
    categoria: recipe.categoria || recipe.category || CATEGORY_LABELS[catKey] || (catKey ? (catKey.charAt(0).toUpperCase() + catKey.slice(1)) : recipe.categoria || ""),
    titulo: rawTitle,
    descricaoCurta:
      recipe.descricaoCurta ||
      recipe.descricao ||
      recipe.excerpt ||
      "Veja os detalhes desta receita.",
    calorias: calories,
    tempo: recipe.tempo || null,
    nutritional: {
      calories,
      protein,
      carbs,
      fat,
    },
    porcoes: recipe.porcoes ?? recipe.servings ?? 1,
    dificuldade: recipe.dificuldade ?? recipe.difficulty ?? "médio",
    seo: recipe.seo ?? {
      metaTitle: rawTitle,
      metaDescription: recipe.descricaoCurta || recipe.descricao || ""
    },
    product: recipe.product ?? null,
    variacoes: recipe.variacoes ?? []
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
  smoothieProteicoMorangoAveia,
  omeleteClarasEspinafre,
  bowlEnergeticoIogurte
].map((r) => normalizeRecipe(r, "fitness"));

const receitasSalgadas = [
  tacosDePeixe,
  wrapDeAtum,
  arrozFrangoLegumes,
  escondidinhoBatataDoce,
  salmaoLimaoAlho
].map((r) => normalizeRecipe(r, "salgadas"));

const receitasDoces = [
  mousseChocolateFit,
  cheesecakeFramboesa,
  cookiesAveiaChocolate,
  pudimChiaCacau,
  brownieBatataDoce
].map((r) => normalizeRecipe(r, "doces"));

const receitasVeganas = [
  curryGraoBico,
  hamburguerLentilha,
  saladaQuinoaAbacate,
  falafelAssado,
  sopaAboboraCoco,
  tofuGrelhadoGergelim
].map((r) => normalizeRecipe(r, "veganas"));

// -------------------------------------------------------
// Index principal
// -------------------------------------------------------
const receitas = {
  fitness: receitasFitness,
  salgadas: receitasSalgadas,
  doces: receitasDoces,
  veganas: receitasVeganas
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
    ...receitasVeganas
  ];
}

// Receitas por categoria principal
export function getReceitasByCategoriaPrincipal(cat) {
  return getAllReceitas().filter((r) => r.categoriaPrincipal === cat);
}

// Pegar receita pelo slug
export function getReceitaBySlug(slug) {
  return getAllReceitas().find((r) => r.slug === slug);
}

// Gerar recomendações automáticas
export function getReceitasRecomendadas(slug, limit = 3) {
  const todas = getAllReceitas();
  const atual = todas.find((r) => r.slug === slug);

  if (!atual) return todas.slice(0, limit);

  return todas
    .filter((r) => r.slug !== slug && r.categoriaPrincipal === atual.categoriaPrincipal)
    .slice(0, limit);
}

export default receitas;
