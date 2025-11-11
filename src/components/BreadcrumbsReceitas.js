import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Breadcrumbs({ paths }) {
  // paths = [{ name: "Receitas", url: "/receitas" }, { name: "Panqueca", url: "/receitas/panqueca" }]
  return (
    <BreadcrumbContainer>
      {paths.map((p, i) => (
        <span key={i}>
          <Link to={p.url}>{p.name}</Link>
          {i < paths.length - 1 && " / "}
        </span>
      ))}
    </BreadcrumbContainer>
  );
}

const BreadcrumbContainer = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;

  a {
    color: #2a9d8f;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
