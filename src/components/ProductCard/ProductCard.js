import React from "react";
import ProductImage from "../ProductImage/ProductImage";
import {
  ProductCard,
  ProductDescription,
  ProductName,
  ProductPrice,
  ProductScience,
  BuyButton,
} from "../ProductsPage/ProductsPage.style";

export default function ProductCardComponent({
  id,
  name,
  price,
  image,
  description,
  scienceText,
  affiliateLink,
}) {
  return (
    <ProductCard tabIndex="0" aria-label={`${name}, ${price}`}>
      <ProductImage src={image} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>{price}</ProductPrice>
      <ProductDescription>{description}</ProductDescription>
      <ProductScience>{scienceText}</ProductScience>
      <BuyButton
        href={affiliateLink}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Comprar
      </BuyButton>
    </ProductCard>
  );
}
