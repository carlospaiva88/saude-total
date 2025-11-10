import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RelatedCarousel({ viagens, categoria }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => setIndex((prev) => (prev + 1) % viagens.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + viagens.length) % viagens.length);

  return (
    <Wrapper>
      <h3>🌍 Você também vai gostar de:</h3>

      <Carousel>
        <ArrowButton left onClick={prev}>
          <ChevronLeft size={28} />
        </ArrowButton>

        <AnimatePresence mode="wait">
          <Card
            as={motion.div}
            key={viagens[index].slug}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            onClick={() =>
              navigate(`/viagens/${categoria}/${viagens[index].slug}`)
            }
          >
            <img src={viagens[index].image} alt={viagens[index].title} />
            <h4>{viagens[index].title}</h4>
            <p>{viagens[index].shortDescription}</p>
          </Card>
        </AnimatePresence>

        <ArrowButton onClick={next}>
          <ChevronRight size={28} />
        </ArrowButton>
      </Carousel>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 3.5rem;
  padding: 2rem;
  text-align: center;

  h3 {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 300px;
  cursor: pointer;
  text-align: left;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  h4 {
    margin: 1rem;
    color: #222;
    font-size: 1.1rem;
  }

  p {
    margin: 0 1rem 1.5rem;
    color: #555;
    font-size: 0.9rem;
  }
`;

const ArrowButton = styled.button`
  position: relative;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.05);
  }

  ${({ left }) => (left ? `order: -1;` : `order: 1;`)}
`;
