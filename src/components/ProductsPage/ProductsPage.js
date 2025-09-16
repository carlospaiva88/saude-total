import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ProductCardComponent from '../ProductCard/ProductCard';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import productsData from '../../data/products';

// Estilos personalizados (você pode manter seus estilos do ProductsPage.styles.js se preferir)
const PageContainer = styled.div`
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const CategoryHighlight = styled.section`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.75rem 2rem;
  background: #edf7f4;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(42, 157, 143, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const HighlightText = styled.div`
  flex: 1;
  h2 {
    font-size: 2rem;
    color: #2a6f61;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.05rem;
    color: #40514e;
    line-height: 1.5;
  }
`;

const CategoryMenu = styled.div`
  display: flex;
  gap: 1.7rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled.button`
  padding: 0.6rem 1.5rem;
  border-radius: 24px;
  border: none;
  background: ${(props) => (props.active ? '#43aa8b' : '#d8eae5')};
  color: ${(props) => (props.active ? 'white' : '#264653')};
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: ${(props) => (props.active ? '0 8px 18px rgba(67,170,139,0.45)' : 'none')};
  transition: all 0.3s ease;
  &:hover {
    background: #2a6f61;
    color: white;
    box-shadow: 0 8px 20px rgba(42, 157, 143, 0.6);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

// ⚠️ ESSE É O WRAPPER DO PRODUTO, DEVE SER FEITO ASSIM PARA O DESTAQUE FUNCIONAR
const ProductWrapper = styled.div`
  &.highlight-product {
    background-color: #d1f7ff;
    box-shadow: 0 0 0 2px #43aa8b;
    transition: background-color 0.3s ease;
  }
`;

// Introdução por categoria
const categoryIntroText = {
  suplementos: {
    title: 'Suplementos Premium para Você',
    description: 'Explore nossa linha selecionada de suplementos que auxiliam no desempenho, recuperação e saúde geral. Produtos com respaldo científico para resultados reais.',
    image: 'https://images.pexels.com/photos/791764/pexels-photo-791764.jpeg',
  },
  acessorios: {
    title: 'Acessórios Funcionais',
    description: 'Equipamentos e acessórios de alta qualidade para apoiar seus treinos e bem-estar diário. Durabilidade e performance em cada item.',
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg',
  },
  vitaminas: {
    title: 'Vitaminas e Saúde',
    description: 'Vitaminas essenciais para fortalecer seu organismo, com fórmulas exclusivas para suporte imunológico, energia e equilíbrio.',
    image: 'https://images.pexels.com/photos/7605733/pexels-photo-7605733.jpeg',
  },
};

export default function ProductsPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(productsData.categories[0].id);
  const { searchedProductId, searchedCategory } = location.state || {};

  // ➡️ Ao buscar e clicar em um produto, vai para a categoria certa e destaca o produto
  useEffect(() => {
    if (searchedProductId && searchedCategory) {
      setActiveCategory(searchedCategory);
      setTimeout(() => {
        const productElement = document.getElementById(searchedProductId);
        if (productElement) {
          productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          productElement.classList.add('highlight-product');
          setTimeout(() => {
            productElement.classList.remove('highlight-product');
          }, 3000);
        }
      }, 150);
    }
  }, [searchedProductId, searchedCategory]);

  const { title, description, image } = categoryIntroText[activeCategory] || {};

  const filteredProducts = productsData.products
    .filter(p => p.category === activeCategory)
    .slice(0, 8);

  return (
    <>
      <Navbar />
      <PageContainer>
        <CategoryHighlight>
          <ProductImage src={image} alt={title} />
          <HighlightText>
            <h2>{title}</h2>
            <p>{description}</p>
          </HighlightText>
        </CategoryHighlight>

        <CategoryMenu>
          {productsData.categories.map(cat => (
            <CategoryButton
              key={cat.id}
              active={cat.id === activeCategory}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </CategoryButton>
          ))}
        </CategoryMenu>

        <ProductsGrid>
          {filteredProducts.map(({ id, name, price, image, description, affiliateLink }) => (
            <ProductWrapper id={id} key={id}>
              <ProductCardComponent
                name={name}
                price={price}
                image={image}
                description={description}
                affiliateLink={affiliateLink}
              />
            </ProductWrapper>
          ))}
        </ProductsGrid>
      </PageContainer>
      <Footer />
    </>
  );
}
