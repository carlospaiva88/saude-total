// Logo.styles.js
import styled, { keyframes, css } from "styled-components";

const wave = keyframes`
  0% { background-position-x: 0; }
  100% { background-position-x: 60px; }
`;

const gradientMove = keyframes`
  0% { background-position-x: 0; }
  100% { background-position-x: 200%; }
`;

export const LogoStyled = styled.a`
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  padding-bottom: 0.5rem;

  /* Estilos diferentes para cada variante */
  ${({ variant }) =>
    variant === "ondas" &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 6px;
        background-image: url('data:image/svg+xml;utf8,<svg width="120" height="6" viewBox="0 0 120 6" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="%2343aa8b" stroke-width="2" d="M0 3c15 6 30-6 45 0s30 6 45 0 30-6 45 0"/></svg>');
        background-repeat: repeat-x;
        background-size: 60px 6px;
        animation: ${wave} 6s linear infinite;
        opacity: 0.5;
      }
    `}

  ${({ variant }) =>
    variant === "gradiente" &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #43aa8b, #90be6d, #43aa8b);
        background-size: 200% 100%;
        animation: ${gradientMove} 3s linear infinite;
        border-radius: 2px;
      }
    `}

  ${({ variant }) =>
    variant === "fixo" &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 60%;
        height: 4px;
        background: #43aa8b;
        border-radius: 2px;
      }
    `}
`;
