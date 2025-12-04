// src/components/BreadCrumbs.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import articlesData from "../../data/articles";

const categoryNames = {
  emocional: "Saúde Emocional",
  fisica: "Saúde Física",
  mental: "Saúde Mental",
};

const subcategoryNames = {
  respiracao: "Respiração",
  meditacao: "Meditação",
  autocontrole: "Autocontrole",
  ombro: "Fortalecimento do Ombro",
  joelho: "Fortalecimento do Joelho",
  quadril: "Fortalecimento do Quadril",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getName = (segment, index) => {
    if (index === pathnames.length - 1 && articlesData[segment]) {
      return articlesData[segment].title;
    }
    if (categoryNames[segment]) return categoryNames[segment];
    if (subcategoryNames[segment]) return subcategoryNames[segment];
    return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <BreadcrumbContainer>
      <Crumbs>
        <Link to="/">Home</Link>
        {pathnames.map((segment, index) => {
          const path = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Current key={path}> → {getName(segment, index)}</Current>
          ) : (
            <span key={path}>
              {" "}
              → <Link to={path}>{getName(segment, index)}</Link>
            </span>
          );
        })}
      </Crumbs>
    </BreadcrumbContainer>
  );
}

// Styled Components
const BreadcrumbContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0.5rem 1rem;
  background: #f0f7f5;      /* fundo suave */
  border-radius: 12px;       /* bordas arredondadas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* sombra leve */
`;

const Crumbs = styled.div`
  font-size: 0.95rem;
  color: #40514e;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  a {
    color: #43aa8b;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    &:hover {
      color: #2a6f61;
      text-decoration: underline;
    }
  }
`;

const Current = styled.span`
  color: #264653;
  font-weight: 600;
  white-space: nowrap; /* evita quebra de linha */
`;
