import React from "react";
import { HeroSection, HeroContent, HeroHeadline, HeroSubheadline, HeroButton } from "./Hero.styles";

export default function Hero() {
  return (
    <HeroSection id="inicio">
      <HeroContent>
        <HeroHeadline>Transforme seu corpo e sua mente hoje</HeroHeadline>
        <HeroSubheadline>
          Descubra os melhores produtos e dicas para melhorar sua performance e saúde
        </HeroSubheadline>
        <HeroButton href="#dicas-saude">
          Confira nossas dicas de saúde
        </HeroButton>
      </HeroContent>
    </HeroSection>
  );
}
