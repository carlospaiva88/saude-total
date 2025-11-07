import React from "react";
import {
  Section,
  SectionTitle,
  CardsGrid,
  Card,
  CardImage,
  CardTitle,
  CardDescription,
  CardButton,
} from "./HealthyRecipes.styles";

const recipes = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    title: "Smoothie Verde Detox",
    description:
      "Refrescante e nutritivo, com couve, abacaxi e gengibre. Ideal para iniciar o dia com energia!",
    link: "/blog/receitas/smoothie-verde-detox",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    title: "Panqueca de Aveia Proteica",
    description:
      "Deliciosa panqueca rica em fibras e proteínas, perfeita para o café da manhã ou pós-treino.",
    link: "/blog/receitas/panqueca-aveia-proteica",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg",
    title: "Salada Mediterrânea",
    description:
      "Colorida, leve e cheia de sabor! Rica em antioxidantes e gorduras boas.",
    link: "/blog/receitas/salada-mediterranea",
  },
];

export default function HealthyRecipes() {
  return (
    <Section id="receitas-saudaveis">
      <SectionTitle>Receitas Saudáveis para o Dia a Dia</SectionTitle>
      <CardsGrid>
        {recipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardImage src={recipe.image} alt={recipe.title} />
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
            <CardButton href={recipe.link}>Ver Receita</CardButton>
          </Card>
        ))}
      </CardsGrid>
    </Section>
  );
}
