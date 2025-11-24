import React from "react";
import {
  CTAWrapper,
  CTAInner,
  CTAContent,
  CTATitle,
  CTASubtitle,
  CTAButton,
  Glow,
  Blob1,
  Blob2,
} from "./FinalCTA.styles";

export default function FinalCTA() {
  return (
    <CTAWrapper>
      <Glow />
      <Blob1 />
      <Blob2 />

      <CTAInner>
        <CTAContent>
          <CTATitle>Eleve sua energia. Viva no seu melhor.</CTATitle>

          <CTASubtitle>
            Bem-estar não começa amanhã — começa no próximo passo.
            Descubra produtos selecionados para corpo e mente que aceleram sua evolução.
          </CTASubtitle>

          <CTAButton
            href="https://amzn.to/3JWNZuI"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorar Agora
          </CTAButton>
        </CTAContent>
      </CTAInner>
    </CTAWrapper>
  );
}
