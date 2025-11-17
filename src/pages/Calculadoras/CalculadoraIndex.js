import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";

export default function CalculadorasIndex() {
  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <Container>
        <Title>Ferramentas de Saúde</Title>
        <Subtitle>Calcule facilmente seu IMC ou suas necessidades calóricas.</Subtitle>
        <Cards>
          <Card as={Link} to="/calculadora/imc">
            <h3>Calculadora IMC</h3>
            <p>Descubra seu índice de massa corporal e veja se está saudável.</p>
          </Card>
          <Card as={Link} to="/calculadora/calorica">
            <h3>Calculadora Calórica</h3>
            <p>Calcule suas necessidades energéticas diárias e planeje sua alimentação.</p>
          </Card>
        </Cards>
      </Container>
      <Footer />
    </>
  );
}

// Styled Components
const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2.5rem;
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  width: 280px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.normal};

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-3px);
  }
`;
