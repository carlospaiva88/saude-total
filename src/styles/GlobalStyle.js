// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset CSS básico */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.dark};
    background-color: ${({ theme }) => theme.colors.light};
    line-height: 1.6;
    overflow-x: hidden;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.normal};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.main};
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
