import React from "react";
import {
  CTASection,
  CTACard,
  CTATitle,
  CTASubtitle,
  CTAButton,
} from "./FinalCTA.styles";

export default function FinalCTA() {
  return (
    <CTASection>
      <CTACard>
        <CTATitle>Transforme sua energia em bem-estar 🌿</CTATitle>
        <CTASubtitle>
          Não espere o momento perfeito — comece hoje!  
          Descubra produtos que impulsionam sua saúde e estilo de vida.
        </CTASubtitle>
        <CTAButton
          href="https://amzn.to/3JWNZuI"
          target="_blank"
          rel="noopener noreferrer"
        >
          Começar Agora
        </CTAButton>
      </CTACard>
    </CTASection>
  );
}
