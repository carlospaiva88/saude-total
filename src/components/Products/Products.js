import React from "react";
import {
  Section,
  SectionTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductButton,
} from "./Products.styles";

export default function Products() {
  return (
    <Section id="produtos">
      <SectionTitle>Os produtos mais vendidos</SectionTitle>
      <ProductsGrid>
        <ProductCard>
          <ProductImage src="https://m.media-amazon.com/images/I/61aVQSXVYrL._AC_SY300_SX300_QL70_ML2_.jpg" alt="Creatina"/>
          <ProductTitle>Creatina</ProductTitle>
          <ProductDescription>Com Creatina, aumente sua força e disposição para treinos intensos.</ProductDescription>
          <ProductButton href="https://amzn.to/47cO3jO" target="_blank" rel="noopener noreferrer">Comprar na Amazon</ProductButton>
        </ProductCard>
        <ProductCard>
          <ProductImage src="https://m.media-amazon.com/images/I/8152gbDUedL._AC_SX522_.jpg" alt="Whey"/>
          <ProductTitle>Whey Protein</ProductTitle>
          <ProductDescription>Whey Protein de alta qualidade para recuperação e ganho muscular.</ProductDescription>
          <ProductButton href="https://amzn.to/41pChik" target="_blank" rel="noopener noreferrer">Comprar na Amazon</ProductButton>
        </ProductCard>
        <ProductCard>
          <ProductImage src="https://m.media-amazon.com/images/I/51jHKlmcgML._AC_SY300_SX300_QL70_ML2_.jpg" alt="VitaminaC"/>
          <ProductTitle>Vitamina C</ProductTitle>
          <ProductDescription>Auxilia no funcionamento do sistema imune; É um antioxidante que auxilia na proteção dos danos causados pelos radicais livres</ProductDescription>
          <ProductButton href="https://amzn.to/45ODUr7" target="_blank" rel="noopener noreferrer">Comprar na Amazon</ProductButton>
        </ProductCard>
      </ProductsGrid>
    </Section>
  );
}
