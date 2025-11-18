// src/utils/recommender.js
// Regras simples: filtra por categoria/keywords e ordena por destaque.

import articlesData from "../../data/articles/index"; 
import receitasIndex from "../../data/receitas/index"; 
import productsData from "../../data/products"; 
const norm = (s = "") =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function flattenReceitas(index) {
  if (!index) return [];
  if (Array.isArray(index)) return index;
  return Object.values(index).flat();
}

function flattenArticles(index) {
  if (!index) return [];
  if (Array.isArray(index)) return index;
  return Object.values(index).flat ? Object.values(index).flat() : Object.values(index);
}

export function recommend({ goal = "manter", tmb = null, weightKg = null, limit = 3 } = {}) {
  const postsArray = flattenArticles(articlesData);
  const receitas = flattenReceitas(receitasIndex);
  const products = productsData?.products || productsData || [];

  const goalKeywords = {
    perder: ["perda", "emagrec", "deficit", "redução", "reduzir", "queima", "gordura"],
    ganhar: ["hipertrofia", "ganhar", "massa", "hipercalorico", "muscul"],
    manter: ["manter", "manutenção", "equilíbrio", "saudável", "habito", "manter peso"],
  };

  const keywords = goalKeywords[goal] || goalKeywords.manter;

  const recommendedArticles = postsArray
    .filter((p) => {
      const hay = norm(`${p.title||p.titulo||""} ${p.description||p.descricao||p.excerpt||""} ${p.category||p.categoria||""}`);
      return keywords.some((k) => hay.includes(k)) || p.featured || p.destaque;
    })
    .slice(0, limit);

  const receitaMatches = receitas
    .map(r => ({ r, hay: norm(`${r.titulo||r.title||""} ${r.descricao||r.description||""} ${(r.ingredientes||[]).join(" ")}`) }))
    .filter(({ hay, r }) => {
      return keywords.some(k => hay.includes(k)) || hay.includes("proteina") || hay.includes("aveia") || hay.includes("frango") || rHasProtein(hay);
    })
    .map(({ r }) => r);

  const recommendedRecipes = receitaMatches.slice(0, limit);

  const recommendedProducts = products
    .filter(p => {
      const hay = norm(`${p.name||p.title||""} ${p.description||p.shortDescription||""} ${p.category||""} ${ (p.tags||[]).join(" ") }`);
      return keywords.some(k => hay.includes(k)) || hay.includes("proteína") || hay.includes("suplemento") || (p.tags||[]).some(t => keywords.includes(norm(t)));
    })
    .slice(0, limit);

  const fallbackArticles = postsArray.filter(p => p.featured || p.destaque).slice(0, limit);
  const fallbackRecipes = receitas.slice(0, limit);
  const fallbackProducts = products.slice(0, limit);

  return {
    articles: recommendedArticles.length ? recommendedArticles : fallbackArticles,
    recipes: recommendedRecipes.length ? recommendedRecipes : fallbackRecipes,
    products: recommendedProducts.length ? recommendedProducts : fallbackProducts,
  };
}

function rHasProtein(hay) {
  return /frango|ovo|ovos|proteína|proteina|tofu|feijão|grão-de-bico|grao-de-bico|atum|atun|salm[oó]n|peixe|carne|iogurte|quinoa|lentilha/i.test(hay);
}

export default recommend;
