// src/data/viagens/index.js
// centraliza viagens por categoria e exporta também um array flat

// nacionais
import chapadaDiamantina from "./nacionais/chapada-diamantina";
import rioDeJaneiro from "./nacionais/rio-de-janeiro";
import serraGaucha from "./nacionais/serra-gaucha";
import lencoisMaranhenses from "./nacionais/lencois-maranhenses";
import jalapao from "./nacionais/jalapao";
import fernandoDeNoronha from "./nacionais/fernando-de-noronha";
import bonito from "./nacionais/bonito";
import alterDoChao from "./nacionais/alter-do-chao";
import florianopolis from "./nacionais/florianopolis";
import morroDeSaoPaulo from "./nacionais/morro-de-sao-paulo";
import ouroPreto from "./nacionais/ouro-preto";

// internacionais
import bali from "./internacionais/bali";
import paris from "./internacionais/paris";
import lisboa from "./internacionais/lisboa";
import maldivas from "./internacionais/maldivas";
import toquio from "./internacionais/toquio";
import cancun from "./internacionais/cancun";
import roma from "./internacionais/roma";
import londres from "./internacionais/londres";
import bariloche from "./internacionais/bariloche";
import puntaCana from "./internacionais/punta-cana";
import novaYork from "./internacionais/nova-york";

const viagensData = {
  nacionais: [
    chapadaDiamantina,
    rioDeJaneiro,
    serraGaucha,
    lencoisMaranhenses,
    jalapao,
    fernandoDeNoronha,
    bonito,
    alterDoChao,
    florianopolis,
    morroDeSaoPaulo,
    ouroPreto,
  ],
  internacionais: [
    bali,
    paris,
    lisboa,
    maldivas,
    toquio,
    cancun,
    roma,
    londres,
    bariloche,
    puntaCana,
    novaYork,
  ],
};

// flat array — preserva category info (adiciona category/subcategory se faltarem)
const viagensArray = Object.entries(viagensData).flatMap(([category, arr]) =>
  (arr || []).map((v) => ({ category, ...v }))
);

// helper para procurar por slug (normalizando)
function normalizeSlug(s = "") {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/\s+/g, "-") // spaces -> hyphen
    .replace(/[^a-zA-Z0-9\-]/g, "") // remove chars inválidos
    .toLowerCase()
    .trim();
}

export { viagensArray, normalizeSlug };
export default viagensData;
