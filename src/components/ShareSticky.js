// src/components/Article/ShareSticky.jsx
import React from "react";
import styled from "styled-components";

export default function ShareSticky({ title = "" }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title || "Confira este artigo");

  return (
    <Fixed role="complementary" aria-label="Barra de compartilhamento">
      <List>
        <Item>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Compartilhar no Facebook"
            title="Compartilhar no Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.2 10.44 21.95v-6.95H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.86h2.74l-.44 2.9h-2.3v6.95C18.34 21.2 22 17.1 22 12.07z"/>
            </svg>
          </a>
        </Item>

        <Item>
          <a
            href={`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tweetar"
            title="Tweetar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.12 1.53-1.94-.67.4-1.42.68-2.22.84C18.5 4.6 17.6 4 16.56 4c-1.34 0-2.43 1.08-2.43 2.41 0 .19.02.38.06.56-2.02-.1-3.82-1.07-5.02-2.55-.21.36-.33.76-.33 1.2 0 .83.42 1.56 1.06 1.99-.52-.02-1.02-.16-1.45-.4v.04c0 1.16.82 2.13 1.9 2.35-.2.05-.4.08-.61.08-.15 0-.3-.01-.44-.04.3.94 1.16 1.62 2.18 1.64-0.8.62-1.82.99-2.91.99-.19 0-.38-.01-.57-.03 1.06.68 2.32 1.07 3.66 1.07 4.4 0 6.81-3.64 6.81-6.8v-.31c.47-.34.88-.77 1.2-1.26-.43.2-.88.33-1.35.39"/>
            </svg>
          </a>
        </Item>

        <Item>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Compartilhar no LinkedIn"
            title="Compartilhar no LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 3H3.55C3.25 3 3 3.25 3 3.55v16.9c0 .3.25.55.55.55h16.9c.3 0 .55-.25.55-.55V3.55c0-.3-.25-.55-.55-.55zM8.34 18H5.67V9.5h2.67V18zM7 8.24c-.86 0-1.56-.7-1.56-1.56S6.14 5.12 7 5.12s1.56.7 1.56 1.56S7.86 8.24 7 8.24zM19 18h-2.67v-4.24c0-1.01-.02-2.3-1.4-2.3-1.4 0-1.61 1.1-1.61 2.24V18H10.7V9.5h2.56v1.17h.04c.36-.68 1.24-1.4 2.55-1.4 2.72 0 3.22 1.79 3.22 4.12V18z"/>
            </svg>
          </a>
        </Item>
      </List>
    </Fixed>
  );
}

/* Styled */
const Fixed = styled.aside`
  position: fixed;
  top: 92px;               /* ajuste se o seu navbar tiver altura diferente */
  right: 16px;
  z-index: 2200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 10px;
  background: rgba(255,255,255,0.92);
  box-shadow: 0 8px 28px rgba(0,0,0,0.08);
  backdrop-filter: blur(4px);

  @media (max-width: 980px) {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 6px;
  display:flex;
  gap:8px;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.li`
  a {
    display:inline-flex;
    width:44px;
    height:44px;
    align-items:center;
    justify-content:center;
    border-radius:10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
    box-shadow: ${({ theme }) => theme.shadow.xs};
    transition: transform ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};
  }
  a:hover, a:focus { transform: translateY(-4px); box-shadow: ${({ theme }) => theme.shadow.md}; outline: none; }
`;
