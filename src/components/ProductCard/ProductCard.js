import styled from "styled-components";
import React from "react";
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardPrice,
  CardButton,
  CardSticker
} from "../CardBase/cardBase";

export default function ProductCard({ product, onBuy }) {
  return (
    <CardWrapper>
      <CardBase>
        {product.category && <CardSticker>{product.category}</CardSticker>}
        <CardImage src={product.image || "/placeholder-16x9.png"} alt={product.name} loading="lazy" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          {product.category && <CardSubtitle>{product.category}</CardSubtitle>}
          {product.description && <CardDescription>{product.description}</CardDescription>}
          {product.price && <CardPrice>€ {product.price}</CardPrice>}
          <CardButton as="button" onClick={onBuy} aria-label={`Comprar ${product.name}`}>Comprar</CardButton>
        </CardBody>
      </CardBase>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`height:100%; display:block;`;
