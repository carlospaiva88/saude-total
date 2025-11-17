import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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

export const theme = {
  colors: {
    primary: "#6CBCA3",
    primaryDark: "#569e87",
    secondary: "#F4A48D",
    secondaryDark: "#d38371",
    background: "#F8F6F3",
    surface: "#FFFFFF",
    dark: "#2F3E46",
    text: "#40514E",
    border: "#E6E3DD",
  },
  gradients: {
    hero: "linear-gradient(135deg, #6CBCA3 0%, #F4A48D 100%)",
    soft: "linear-gradient(135deg, rgba(108,188,163,0.15), rgba(244,164,141,0.15))"
  },
  shadow: {
    xs: "0 2px 6px rgba(0,0,0,0.06)",
    sm: "0 4px 12px rgba(0,0,0,0.08)",
    md: "0 6px 20px rgba(0,0,0,0.12)",
    lg: "0 12px 40px rgba(0,0,0,0.18)",
  },
  radius: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "22px",
    pill: "50px"
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  transitions: {
    fast: "0.2s ease",
    normal: "0.35s ease",
    slow: "0.6s ease",
  },
  layout: {
    maxWidth: "1200px",
    sectionPadding: "4rem 1.5rem",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px",
  },
};
