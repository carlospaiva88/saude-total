import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const categorias = [
  { nome: "Todas", path: "/receitas" },
  { nome: "Fitness", path: "/receitas/fitness" },
  { nome: "Salgadas", path: "/receitas/salgadas" },
  { nome: "Doces", path: "/receitas/doces" },
];

export default function ReceitasCategoriaMenu() {
  return (
    <MenuContainer>
      {categorias.map((cat) => (
        <MenuLink key={cat.nome} to={cat.path}>
          {cat.nome}
        </MenuLink>
      ))}
    </MenuContainer>
  );
}

// Styled Components
const MenuContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  background: #f1faee;
  padding: 1rem 0;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #264653;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #2a9d8f;
  }
`;
