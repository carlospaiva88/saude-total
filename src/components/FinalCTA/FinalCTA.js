import React from "react";
import { FinalCTAWrapper, FinalCTACard, FinalButton } from "./FinalCTA.styles";

export default function FinalCTA() {
  return (
    <FinalCTAWrapper>
      <FinalCTACard>
        <h2>Você merece uma vida mais saudável e plena!</h2>
        <p>
          Sua jornada para o bem-estar começa aqui. Aproveite a oferta exclusiva e dê o primeiro passo agora mesmo.
        </p>
        <FinalButton
          href="https://amzn.to/3JWNZuI"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compre agora com desconto"
        >
          Aproveitar Oferta Imperdível
        </FinalButton>
      </FinalCTACard>
    </FinalCTAWrapper>
  );
}
