import styled, { keyframes } from "styled-components";

import 
{ HeroSection,
  HeroButton,
  HeroContent, 
  HeroHeadline, 
  HeroImage,
  HeroImageWrapper, 
  HeroSubheadline, 
   } from "./Hero.styles";




export default function Hero() {
  return (
    <HeroSection id="inicio">
      <HeroContent>
        <HeroHeadline>Viva no Flow - Equilíbrio, saúde e bem-estar todos os dias</HeroHeadline>
        <HeroSubheadline>
          Descubra dicas, receitas e produtos para transformar corpo e mente
        </HeroSubheadline>
        <HeroButton href="#blog">Confira nossas dicas de saúde</HeroButton>
      </HeroContent>

      <HeroImageWrapper>
        <HeroImage
          src="https://images.pexels.com/photos/386024/pexels-photo-386024.jpeg?_gl=1*12f4ney*_ga*NTA3OTg2NTc1LjE3NjEyOTM1MzQ.*_ga_8JE65Q40S6*czE3NjIyNjE3MTIkbzIkZzEkdDE3NjIyNjE4NTUkajU5JGwwJGgw"
          alt="Pessoa saudável fazendo exercício"
          loading="lazy"
        />
      </HeroImageWrapper>
    </HeroSection>
  );
}
