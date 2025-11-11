import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  border-radius: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  margin-bottom: 80px;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  max-width: 700px;
  font-size: 1.1rem;
  margin-bottom: 1.8rem;
`;

const Button = styled(Link)`
  background: white;
  color: black;
  font-weight: 600;
  padding: 0.9rem 2.4rem;
  border-radius: 50px;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    background: #f3f3f3;
    transform: translateY(-3px);
  }
`;

const RecipeHeroCarousel = ({ receitas }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % receitas.length),
      6000
    );
    return () => clearInterval(interval);
  }, [receitas.length]);

  const receita = receitas[index];

  return (
    <CarouselWrapper>
      <AnimatePresence mode="wait">
        <motion.img
          key={receita.slug}
          src={receita.imagem}
          alt={receita.titulo}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <Overlay>
        <Title>{receita.titulo}</Title>
        <Description>{receita.descricao}</Description>
        <Button to={`/receitas/${receita.slug}`}>Ver Receita</Button>
      </Overlay>
    </CarouselWrapper>
  );
};

export default RecipeHeroCarousel;
