// recipes/index.js
import panquecaBananaAveia from "./fitness/panqueca-banana-aveia";

// Todas as receitas em um array
export const recipes = [
  { ...panquecaBananaAveia, friendlySlug: "panqueca-banana-aveia" },
  // você pode adicionar mais receitas aqui
];

// Mapa de acesso rápido por slug/friendlySlug
const recipesData = {};
recipes.forEach((r) => {
  recipesData[r.slug] = r;
  recipesData[r.friendlySlug] = r;
});

export default recipesData;
