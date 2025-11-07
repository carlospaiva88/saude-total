// src/styles/theme.js
export const theme = {
  colors: {
    primary: "#6CBCA3", // verde principal (logo)
    secondary: "#F4A48D", // coral
    background: "#F8F6F3", // fundo verde-claro
    text: "#40514E",
    white: "#FFFFFF",
    dark: "#2F3E46",
  },
  gradients: {
    hero: "linear-gradient(135deg, #6CBCA3 0%, #F4A48D 100%)",
    button: "linear-gradient(45deg, #6CBCA3, #F4A48D)",
    buttonHover: "linear-gradient(45deg, #F4A48D, #6CBCA3)",
  },
  shadow: {
    light: "0 4px 10px rgba(108, 188, 163, 0.15)",
    medium: "0 6px 20px rgba(108, 188, 163, 0.2)",
  },
  radius: {
    card: "16px",
    button: "30px",
  },
  font: {
    family: "'Poppins', sans-serif",
  },
};
