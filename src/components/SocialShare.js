// src/components/Share/SocialShare.jsx
import React from "react";
import styled from "styled-components";

export default function SocialShare({ url, title, vertical = true }) {
  const page = encodeURIComponent(url || (typeof window !== "undefined" ? window.location.href : ""));
  const text = encodeURIComponent(title || "Confira este conteúdo");

  return (
    <Wrapper vertical={vertical} aria-label="Compartilhar">
      <Icon as="a" href={`https://www.facebook.com/sharer/sharer.php?u=${page}`} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no Facebook">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.93v-7.04H8.07v-2.9h2.37V9.41c0-2.34 1.39-3.63 3.52-3.63.  1.02 0 2.09.18 2.09.18v2.3H15.9c-1.17 0-1.53.73-1.53 1.48v1.78h2.6l-.42 2.9h-2.18v7.04C18.34 21.19 22 17.06 22 12.07z" fill="currentColor"/></svg>
      </Icon>

      <Icon as="a" href={`https://twitter.com/intent/tweet?text=${text}&url=${page}`} target="_blank" rel="noopener noreferrer" aria-label="Tweetar">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.44 1.27-1.14 1.53-1.97-.67.4-1.41.68-2.2.83A3.482 3.482 0 0 0 12.8 8.5c0 .27.03.54.09.79C8.39 9.11 5.08 7.1 2.9 4.03c-.3.52-.47 1.12-.47 1.76 0 1.21.62 2.27 1.56 2.9-.57-.02-1.1-.18-1.57-.44v.04c0 1.7 1.2 3.11 2.8 3.43-.29.07-.6.11-.92.11-.22 0-.44-.02-.65-.06.44 1.36 1.72 2.35 3.24 2.38A7.007 7.007 0 0 1 2 19.54a9.9 9.9 0 0 0 5.35 1.57c6.42 0 9.94-5.32 9.94-9.94v-.45c.67-.49 1.25-1.1 1.71-1.8-.62.28-1.28.47-1.96.56z" fill="currentColor"/></svg>
      </Icon>

      <Icon as="a" href={`https://www.linkedin.com/shareArticle?mini=true&url=${page}&title=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no LinkedIn">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><path d="M6.94 21H2.8V8.99h4.14V21zM4.86 7.45C3.7 7.45 2.78 6.5 2.78 5.34 2.78 4.18 3.7 3.23 4.86 3.23c1.16 0 2.08.95 2.08 2.11 0 1.16-.92 2.11-2.08 2.11zM21.2 21h-4.13v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.95V21h-4.13V8.99h3.97v1.62h.06c.55-1.04 1.9-2.14 3.92-2.14 4.19 0 4.96 2.76 4.96 6.35V21z" fill="currentColor"/></svg>
      </Icon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};
  gap: 0.6rem;
  align-items: center;
  padding: 0;
`;
const Icon = styled.a`
  width:44px;
  height:44px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primaryDark};
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadow.xs};
  transition: transform 120ms ease;
  &:hover { transform: translateY(-3px); color: ${({ theme }) => theme.colors.primary}; }
`;
