// src/components/ArticleCard/ArticleCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/*
  ArticleCard padronizado — utiliza imagem fixa na altura,
  limita linhas de título/descrição para padronizar tamanho.
*/

export default function ArticleCard({ item, to }) {
  const title = item.title || item.titulo || item.name || "Sem título";
  const excerpt = item.excerpt || item.descricao || item.description || (item.content ? stripHtml(item.content).slice(0, 120) : "");

  return (
    <Card to={to}>
      <Thumb style={{ backgroundImage: `url(${item.image || item.imagem || item.thumbnail || ""})` }} />
      <Body>
        <Meta>
          <Category>{(item.category || item.categoria || "").toString()}</Category>
          <Time>{item.readingTime || item.tempo || ""}</Time>
        </Meta>
        <Title>{title}</Title>
        <Excerpt>{excerpt}</Excerpt>
      </Body>
    </Card>
  );
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>?/gm, "");
}

/* Styled */
const Card = styled(Link)`
  display:flex;
  flex-direction:column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow:hidden;
  text-decoration:none;
  color:inherit;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover { transform: translateY(-6px); box-shadow: ${({ theme }) => theme.shadow.md}; }
`;

const Thumb = styled.div`
  width:100%;
  height:200px;
  background-size:cover;
  background-position:center;
`;

const Body = styled.div`
  padding: 1rem;
  display:flex;
  flex-direction:column;
  gap:0.5rem;
  min-height: 150px;
`;

const Meta = styled.div`
  display:flex;
  justify-content:space-between;
  font-size:0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity:0.85;
`;

const Category = styled.span``;
const Time = styled.span``;

const Title = styled.h3`
  font-size:1.05rem;
  margin:0;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height:1.25;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;

const Excerpt = styled.p`
  font-size:0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top:auto;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;
