// Logo.js
import React from "react";
import { LogoStyled } from "./Logo.styles";

export default function Logo({ variant = "ondas" }) {
  return (
    <LogoStyled href="/" variant={variant}>
      Saúde em Movimento
    </LogoStyled>
  );
}
