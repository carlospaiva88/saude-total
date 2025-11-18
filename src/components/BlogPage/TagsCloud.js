// src/components/Blog/TagsCloud.jsx
import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TagsCloud({ articles = [] }) {
  const tags = useMemo(() => {
    const map = new Map();
    articles.forEach(a => {
      const cats = [];
      if (a.category) cats.push(a.category);
      if (a.categoria) cats.push(a.categoria);
      // pega palavras-chave do title
      const titleWords = (a.title || a.titulo || "").split(/\s+/).slice(0,3);
      titleWords.forEach(w => map.set(w.toLowerCase(), (map.get(w.toLowerCase())||0)+1));
      cats.forEach(c => {
        if (!c) return;
        const key = c.toLowerCase();
        map.set(key, (map.get(key) || 0) + 2);
      });
    });
    // ordenar por frequência
    return Array.from(map.entries()).sort((a,b)=>b[1]-a[1]).slice(0,18).map(([tag])=>tag);
  }, [articles]);

  return (
    <Wrap>
      <h4>Explorar por tema</h4>
      <Cloud>
        {tags.map(t => (
          <Tag key={t} to={`/blog/${t}`}>#{t}</Tag>
        ))}
      </Cloud>
    </Wrap>
  );
}

const Wrap = styled.div` margin-bottom: 0.6rem; `;
const Cloud = styled.div` display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem; `;
const Tag = styled(Link)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primaryDark};
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  text-decoration:none;
`;
