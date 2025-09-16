// FinalCTA.js
import React from "react";
import { FinalCTAWrapper, FinalCTACard, FinalButton } from "./FinalCTA.styles";

export default function FinalCTA() {
  return (
    <FinalCTAWrapper>
      <FinalCTACard>
        <h2>Está pronto para transformar sua vida?</h2>
        <p>
          Dê o próximo passo no cuidado da sua saúde e bem-estar.  
          Clique no botão abaixo e aproveite a oferta exclusiva.
        </p>
        <FinalButton
          href="https://amzn.to/3JWNZuI"
          target="_blank"
          rel="noopener noreferrer"
        >
          Compre Agora com Desconto
        </FinalButton>
      </FinalCTACard>
    </FinalCTAWrapper>
  );
}
