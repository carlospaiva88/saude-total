export function calcularTMB({ sexo, peso, altura, idade }) {
  if (sexo === "masculino") {
    return Math.round(88.36 + 13.4 * peso + 4.8 * altura - 5.7 * idade);
  }
  return Math.round(447.6 + 9.2 * peso + 3.1 * altura - 4.3 * idade);
}

export function calcularCalorias(tmb, atividade) {
  const fatores = {
    leve: 1.375,
    moderada: 1.55,
    intensa: 1.725
  };
  return Math.round(tmb * fatores[atividade]);
}

export function calcularMacros(tmb, objetivo) {
  const base = tmb * (objetivo === "perder" ? 0.8 : objetivo === "ganhar" ? 1.2 : 1);
  return {
    proteinaGr: Math.round(base * 0.30 / 4),
    carboGr: Math.round(base * 0.45 / 4),
    gorduraGr: Math.round(base * 0.25 / 9),
    manutencao: Math.round(base)
  };
}
