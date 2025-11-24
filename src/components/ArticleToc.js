// src/components/Article/ArticleTOC.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * ArticleTOC
 * - recebe contentRef (ref para o container do artigo)
 * - gera lista de headings h2/h3
 * - adiciona id seguro quando ausente (slugify mínimo)
 * - scroll suave até o heading
 * - colapsável em mobile (acordeão)
 *
 * Uso:
 * <ArticleTOC contentRef={contentRef} />
 */

function makeId(str) {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/<\/?[^>]+(>|$)/g, "") // remove tags
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // remove chars especiais
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticleTOC({ contentRef, maxDepth = 3 }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!contentRef || !contentRef.current) {
      setItems([]);
      return;
    }
    const root = contentRef.current;
    const nodeList = root.querySelectorAll("h2, h3");
    const arr = Array.from(nodeList).map((el) => {
      // ensure id
      if (!el.id) {
        const id = makeId(el.textContent || el.innerText || "heading");
        // if id exists in DOM, append numeric suffix
        let candidate = id;
        let i = 1;
        while (document.getElementById(candidate)) {
          candidate = `${id}-${i++}`;
        }
        el.id = candidate;
      }
      return {
        id: el.id,
        text: el.textContent || el.innerText,
        tag: el.tagName.toLowerCase(),
      };
    });

    setItems(arr);
  }, [contentRef]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const topOffset = 96 + 8; // navbar height + small gap (adjust if needed)
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const target = rect.top + scrollTop - topOffset;
    window.scrollTo({ top: target, behavior: "smooth" });
    // optionally update hash without jump
    window.history.replaceState && window.history.replaceState(null, "", `#${id}`);
  };

  if (!items || items.length === 0) return null;

  // group into h2 -> children h3
  const grouped = [];
  let lastH2 = null;
  items.forEach(item => {
    if (item.tag === "h2") {
      lastH2 = { ...item, children: [] };
      grouped.push(lastH2);
    } else if (item.tag === "h3") {
      if (!lastH2) {
        // orphan h3 — treat as top-level
        lastH2 = { id: item.id, text: item.text, tag: "h2", children: [] };
        grouped.push(lastH2);
      } else {
        lastH2.children.push(item);
      }
    }
  });

  return (
    <Wrapper aria-label="Índice do artigo">
      <Header>
        <h4>Índice</h4>
        <Toggle onClick={() => setOpen(v => !v)} aria-expanded={open}>
          {open ? "Ocultar" : "Mostrar"}
        </Toggle>
      </Header>

      {open && (
        <List>
          {grouped.map(section => (
            <li key={section.id}>
              <Link href={`#${section.id}`} onClick={(e) => handleClick(e, section.id)} aria-label={`Ir para ${section.text}`}>
                {section.text}
              </Link>
              {section.children && section.children.length > 0 && (
                <SubList>
                  {section.children.map(ch => (
                    <li key={ch.id}>
                      <LinkSmall href={`#${ch.id}`} onClick={(e) => handleClick(e, ch.id)} aria-label={`Ir para ${ch.text}`}>
                        {ch.text}
                      </LinkSmall>
                    </li>
                  ))}
                </SubList>
              )}
            </li>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

/* Styled */
const Wrapper = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.95rem;
`;

const Header = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 0.5rem;
  h4 { margin:0; color: ${({ theme }) => theme.colors.primaryDark}; font-size:1rem; }
`;

const Toggle = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-weight: 600;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  &:hover, &:focus { background: ${({ theme }) => theme.colors.background}; outline: none; }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
  display:flex;
  flex-direction:column;
  gap: 0.4rem;
  li { margin: 0; }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display:block;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  transition: background ${({ theme }) => theme.transitions.fast};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};

  &:hover, &:focus { background: ${({ theme }) => theme.colors.background}; outline: none; }
`;

const SubList = styled.ul`
  list-style: none;
  margin: 0.25rem 0 0 0.5rem;
  padding: 0;
  display:flex;
  flex-direction:column;
  gap: 0.3rem;
`;

const LinkSmall = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display:block;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  &:hover, &:focus { background: ${({ theme }) => theme.colors.background}; outline: none; }
`;
