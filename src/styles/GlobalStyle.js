import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* ------------------------------ */
  /* RESET BASE MODERNO            */
  /* ------------------------------ */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primaryDark};
    transition: ${({ theme }) => theme.transitions.normal};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition: ${({ theme }) => theme.transitions.fast};
  }

  input, textarea {
    font-family: ${({ theme }) => theme.fonts.main};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
