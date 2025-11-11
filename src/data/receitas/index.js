// src/data/receitas/index.js

import panquecaBananaAveia from "./fitness/panqueca-banana-aveia";
import smothieVerdeDetox from "./fitness/smothie-verde-detox";
import frangoGrelhadoErvas from "./fitness/frango-grelhado-ervas";
import saladaMediterranea from "./fitness/salada-mediterranea";
import pastaIntegralPesto from "./fitness/pasta-integral-pesto";

import tacosDePeixe from "./salgadas/tacos-peixe";
import wrapDeAtum from "./salgadas/wrap-de-atum";

import mousseChocolateFit from "./doces/mousse-chocolate-fit";
import cheesecakeFramboesa from "./doces/cheesecake-framboesa";

import overnightOats from "./fitness/overnight-oats";

const receitasFitness = [
  panquecaBananaAveia,
  smothieVerdeDetox,
  frangoGrelhadoErvas,
  saladaMediterranea,
  pastaIntegralPesto,
  overnightOats,
];

const receitasSalgadas = [
  tacosDePeixe,
  wrapDeAtum,
];

const receitasDoces = [
  mousseChocolateFit,
  cheesecakeFramboesa,
];

const receitas = {
  fitness: receitasFitness,
  salgadas: receitasSalgadas,
  doces: receitasDoces,
};

export default receitas;
