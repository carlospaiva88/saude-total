import React from "react";
import {
  Section,
  SectionTitle,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductDescription,
  BuyButton,
} from "./ProductShowcase.styles";

const featuredProducts = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/61aVQSXVYrL._AC_SY300_SX300_QL70_ML2_.jpg",
    title: "Creatina Monohidratada",
    description: "Melhore sua performance e força com a creatina mais recomendada.",
    link: "https://amzn.to/47cO3jO",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/8152gbDUedL._AC_SX522_.jpg",
    title: "Whey Protein Isolado",
    description: "Recupere-se mais rápido com proteína de alta qualidade.",
    link: "https://amzn.to/41pChik",
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/51jHKlmcgML._AC_SY300_SX300_QL70_ML2_.jpg",
    title: "Vitamina C + Zinco",
    description: "Refaça suas defesas com a combinação perfeita de imunidade.",
    link: "https://amzn.to/45ODUr7",
  },
];

export default function ProductShowcase() {
  return (
    <Section id="produtos-destaque">
      <SectionTitle>Produtos em Destaque</SectionTitle>
      <ProductGrid>
        {featuredProducts.map((p) => (
          <ProductCard key={p.id}>
            <ProductImage src={p.image} alt={p.title} />
            <ProductTitle>{p.title}</ProductTitle>
            <ProductDescription>{p.description}</ProductDescription>
            <BuyButton
              href={p.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Ver Produto
            </BuyButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </Section>
  );
}
