// src/components/Article/ArticleTOC.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * Gera um índice (toc) a partir dos headings dentro do contentRef.
 * Recebe contentRef (ref para o container do artigo).
 */
export default function ArticleTOC({ contentRef }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!contentRef || !contentRef.current) return;
    const root = contentRef.current;
    const heads = [...root.querySelectorAll("h2, h3")].map(h => ({
      id: h.id || (h.id = h.textContent.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g,'')),
      text: h.textContent,
      tag: h.tagName.toLowerCase()
    }));
    setItems(heads);
  }, [contentRef]);

  if (!items || items.length === 0) return null;

  return (
    <Wrapper aria-label="Índice do artigo">
      <Heading>Índice</Heading>
      <List>
        {items.map(it => (
          <li key={it.id} className={it.tag}>
            <a href={`#${it.id}`} onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(it.id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              {it.text}
            </a>
          </li>
        ))}
      </List>
    </Wrapper>
  );
}

/* Styled */
const Wrapper = styled.nav`
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.8rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  max-width: 280px;
`;

const Heading = styled.h4`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: calc(100vh - 220px); /* dentro do StickySidebar, isso reduz ainda mais */
  overflow-y: auto;
  padding-right: 0.25rem;

  li { margin: 0.35rem 0; }

  li.h3 { padding-left: 0.6rem; font-size: 0.95rem; color: ${({ theme }) => theme.colors.text}; }
  li.h2 { font-weight: 600; color: ${({ theme }) => theme.colors.primaryDark}; }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: 0.95rem;
    display: inline-block;
    width: 100%;
  }

  a:hover, a:focus { color: ${({ theme }) => theme.colors.primary}; text-decoration: underline; }
`;
