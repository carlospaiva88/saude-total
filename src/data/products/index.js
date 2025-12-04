// src/data/products/index.js
// Agregador oficial de produtos (Amazon-API Ready + Escalável)

// ------------------ IMPORTS ------------------

// Suplementos
import creatina from "./suplementos/creatina";
import wheyIsolado from "./suplementos/whey-protein-isolado";
import bcaa from "./suplementos/bcaa";
import glutamina from "./suplementos/glutamina";
import termogenico from "./suplementos/termogenico";
import preTreino from "./suplementos/preTreino";

// Vitaminas
import omega3 from "./vitaminas/omega3";
import multivitaminico from "./vitaminas/multivitaminico";
import colageno from "./vitaminas/colageno";
import complexoB from "./vitaminas/complexoB";
import vitaminaC from "./vitaminas/vitaminaC";
import vitaminaD from "./vitaminas/vitaminaD";



// Acessorios
import elasticBand from "./acessorios/elasticBand";
import faixaLombar from "./acessorios/faixaLombar";
import bolaExercicio from "./acessorios/bolaExercicio";
import colchoneteYoga from "./acessorios/colchoneteYoga";
import cordaPular from "./acessorios/cordaPular";

import halteres from "./acessorios/halteresAjustaveis";


// Home Gym
import massageGun from "./home-gym-essentials/massage-gun-pro";
import foamRoller from "./home-gym-essentials/foam-roller-densidade";
import miniBands from "./home-gym-essentials/mini-bands-set-5";
import kettlebell from "./home-gym-essentials/kettlebell-8kg";
import tapetePremium from "./home-gym-essentials/tapete-premium-yoga";

// Relaxamento & Sono
import difusorAromatico from "./relaxamento/difusor-ultrassonico-300ml";
import oleosEssenciais from "./relaxamento/kit-oleos-essenciais-10ml-6pc";
import weightedBlanket from "./relaxamento/manta-weighted-blanket-4kg";
import tapeteAcupressao from "./relaxamento/tapete-acupressao-eco-set";

// Viagem
import mochila30L from "./viagem/mochila-viagem-30l";
import toalhaQuickDry from "./viagem/toalha-quick-dry-microfibra-medium";
import powerbank20000 from "./viagem/powerbank-20000mah-rapido";
import packingCube from "./viagem/packing-cubes-set-6pcs"
import almofadaPescoco from "./viagem/almofada-pescoco-inflavel-travel-pillow"
import necessarieToiletry from "./viagem/necessaire-toiletry-bag-waterproof"
import adaptadorUniversal from "./viagem/adaptador-universal-viagem-uk-eu-us"


// Lifestyle e Bem-estar
import garrafaInox from "./lifestyle/garrafa-inox";
import plannerBienestar from "./lifestyle/planner-bemestar";
import almofadaPostura from "./lifestyle/almofada-postura";
import lampadaWakeUp from "./lifestyle/lampada-wakeup";

// Biohacking
import blueLightGlasses from "./bio-hacking/blue-light-glasses";
import coldPlungeMini from "./bio-hacking/cold-plunge-mini";
import monitorSono from "./bio-hacking/monitor-sono";
import suplementoAshwagandha from "./bio-hacking/ashwagandha";


// Cozinha
import airfryerCompacta from "./cozinha-saudavel/airfryer-compacta"
import balancaDigital from "./cozinha-saudavel/balanca-digital-alimentos"
import conjuntosPotesHermeticos from "./cozinha-saudavel/conjuntos-potes-hermeticos"
import liquidificadorBlender from "./cozinha-saudavel/liquidificador-blender"
import mixerImmersion from "./cozinha-saudavel/mixer-immersion"
import panelaAntiAderente from "./cozinha-saudavel/panela-antiaderente"


// ----------------------------------------------------------
//          CATEGORIAS UNIVERSAIS PADRONIZADAS
// ----------------------------------------------------------

export const productCategories = [
  { id: "suplementos", name: "Suplementos" },
  { id: "vitaminas", name: "Vitaminas & Saúde" },
  { id: "acessorios-fitness", name: "Acessórios Fitness" },

  { id: "home-gym-essentials", name: "Home Gym Essentials" },
  { id: "relaxamento", name: "Relaxamento & Sono" },
  { id: "viagem", name: "Viagem & Outdoor" },
  { id: "lifestyle", name: "Lifestyle & Bem-estar" },
  { id: "biohacking", name: "Biohacking" },
  { id: "cozinha-saudavel", name: "Cozinha Saudavel" },

];

// ----------------------------------------------------------
//            ARRAY UNIFICADO DE PRODUTOS
// ----------------------------------------------------------

export const products = [
  // Suplementos
  creatina,
  wheyIsolado,
  bcaa,
  glutamina,
  termogenico,
  preTreino,

  // Vitaminas
  omega3,
  multivitaminico,
  colageno,
  complexoB,
  vitaminaC,
  vitaminaD,


  // Acessórios
  elasticBand,
  faixaLombar,
  bolaExercicio,
  halteres,
  colchoneteYoga,
  cordaPular,

  // Home Gym
  massageGun,
  foamRoller,
  miniBands,
  kettlebell,
  tapetePremium,

  // Relaxamento
  difusorAromatico,
  oleosEssenciais,
  weightedBlanket,
  tapeteAcupressao,

  // Viagem
  mochila30L,
  toalhaQuickDry,
  powerbank20000,
  adaptadorUniversal,
  necessarieToiletry,
  packingCube,
  almofadaPescoco,

  

  // Lifestyle
  garrafaInox,
  plannerBienestar,
  almofadaPostura,
  lampadaWakeUp,

  // Biohacking
  blueLightGlasses,
  coldPlungeMini,
  monitorSono,
  suplementoAshwagandha,

// Cozinha Saudavel
  airfryerCompacta,
  balancaDigital,
  conjuntosPotesHermeticos,
  mixerImmersion,
  panelaAntiAderente,
  liquidificadorBlender,
];

// Objeto compatível com o formato antigo
const productsData = {
  categories: productCategories,
  products,
};

export default productsData;
