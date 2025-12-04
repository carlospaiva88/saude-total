// src/components/Article/ContentRenderer.jsx
import React, { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify"; // instale: npm i dompurify

const Content = forwardRef(({ html }, ref) => {
  const localRef = useRef();
  const rootRef = ref || localRef;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // garante que cada h2/h3 tenha um id
    Array.from(root.querySelectorAll("h2, h3")).forEach((h) => {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
      }
    });
  }, [html, rootRef]);

  return (
    <ArticleContent ref={rootRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html || "") }} />
  );
});

export default Content;

const ArticleContent = styled.article`
  max-width: 68ch;
  margin: 0 auto;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.75;

  h2 { font-size: 1.45rem; margin-top:2rem; color: ${({ theme }) => theme.colors.dark}; }
  h3 { font-size: 1.15rem; margin-top:1.25rem; color: ${({ theme }) => theme.colors.primaryDark}; }
  p { margin: 1rem 0; }
  ul, ol { margin: 1rem 0 1.5rem 1.25rem; }
  blockquote { border-left: 4px solid ${({ theme }) => theme.colors.primary}; padding: .5rem 1rem; background: rgba(0,0,0,0.02); border-radius:8px; }
  img { max-width:100%; height:auto; border-radius: 8px; display:block; margin:1rem 0; }
`;
