import React from "react";
import CalculadoraIMC from "./CalculadoraIMC";
import CalculadoraCalorica from "./CalculadoraCalorica";
import { PageWrapper } from "./CalculadoraPageWrapper.styles";

export default function CalculadorasInterativas() {
  return (
    <PageWrapper>
      <CalculadoraIMC />
      <CalculadoraCalorica />
    </PageWrapper>
  );
}
