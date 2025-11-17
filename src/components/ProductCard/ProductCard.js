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
    <CardBase>
      {product.category && <CardSticker>{product.category}</CardSticker>}
      <CardImage src={product.image} alt={product.name} />
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        {product.category && <CardSubtitle>{product.category}</CardSubtitle>}
        {product.description && (
          <CardDescription>{product.description}</CardDescription>
        )}
        {product.price && <CardPrice>€ {product.price}</CardPrice>}

        <CardButton  onClick={onBuy}>Comprar</CardButton>
      </CardBody>
    </CardBase>
  );
}
