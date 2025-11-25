// src/components/Receitas/RecipeCard.jsx
import React from "react";
import { CardBase, CardImage, CardBody, CardTitle, CardSubtitle, CardDescription, CardSticker } from "../CardBase/cardBase";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function RecipeCard(props) {
  // aceita prop 'recipe' ou 'receita' para compatibilidade
  const recipe = props.recipe || props.receita;

  if (!recipe) return null;

  const title = recipe.titulo || recipe.title || recipe.name || "Receita";
  const excerpt = recipe.descricaoCurta || recipe.description || recipe.excerpt || "";
  const image = recipe.imagem || recipe.image || "/placeholder-4x3.png";
  const to = `/receitas/${encodeURIComponent(recipe.slug || recipe.id || "")}`;

  return (
    <CardLink to={to}>
      <CardBaseStyled>
        {recipe.categoria && <CardStickerStyled>{recipe.categoria}</CardStickerStyled>}
        <CardImage src={image} alt={title} />
        <CardBody>
          <CardTitleStyled>{title}</CardTitleStyled>
          {recipe.subtitle && <CardSubtitle>{recipe.subtitle}</CardSubtitle>}
          <CardDescriptionStyled>{excerpt}</CardDescriptionStyled>

          <MetaRow>
            {recipe.tempo && <SmallBadge>{recipe.tempo}</SmallBadge>}
            {recipe.porcoes && <SmallBadge>Rende: {recipe.porcoes}</SmallBadge>}
            {recipe.dificuldade && <SmallBadge>{recipe.dificuldade}</SmallBadge>}
          </MetaRow>
        </CardBody>
      </CardBaseStyled>
    </CardLink>
  );
}

/* Small styled overrides to keep consistent look */
const CardBaseStyled = styled(CardBase)`height:100%; display:flex; flex-direction:column;`;
const CardTitleStyled = styled(CardTitle)`font-size:1.06rem; margin-bottom:0.2rem;`;
const CardDescriptionStyled = styled(CardDescription)`flex:1 1 auto; min-height: 2.6rem;`;
const CardStickerStyled = styled(CardSticker)`background: ${({theme})=>theme.colors.primary}; color: ${({theme}) => theme.colors.surface}; font-weight:700; padding:.26rem .6rem;`;
const SmallBadge = styled.span`background: ${({theme})=>theme.colors.surfaceAlt || "#f3f3f3"}; padding:.25rem .5rem; border-radius:999px; font-size:0.8rem; color:${({theme})=>theme.colors.primaryDark}; margin-right:.4rem`;
const MetaRow = styled.div`display:flex; gap:.4rem; margin-top:.6rem; align-items:center`;
const CardLink = styled(Link)`display:block; text-decoration:none; color:inherit; height:100%;`;
