import React from "react";
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardSticker
} from "../CardBase/CardBase";

export default function RecipeCard({ recipe }) {
  return (
    <CardBase>
      {recipe.category && <CardSticker>{recipe.category}</CardSticker>}
      <CardImage src={recipe.image} alt={recipe.title} />
      <CardBody>
        <CardTitle>{recipe.title}</CardTitle>
        {recipe.subtitle && <CardSubtitle>{recipe.subtitle}</CardSubtitle>}
        {recipe.description && (
          <CardDescription>{recipe.description}</CardDescription>
        )}
      </CardBody>
    </CardBase>
  );
}
