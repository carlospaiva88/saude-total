import React from "react";
import {
  HeroSection,
  HeroButton,
  HeroContent,
  HeroHeadline,
  HeroImage,
  HeroImageWrapper,
  FloatingImage,
  HeroSubheadline,
} from "./Hero.styles";

const floatingImages = [
  {
    src: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    pos: "top-left",
    delay: "0s",
    decorative: true,
  },
  {
    src: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
    pos: "top-right",
    delay: "0.8s",
    decorative: true,
  },
  {
    src: "https://images.pexels.com/photos/3076514/pexels-photo-3076514.jpeg",
    pos: "bottom-right",
    delay: "1.6s",
    decorative: true,
  },
  {
    src: "https://images.pexels.com/photos/3757375/pexels-photo-3757375.jpeg",
    pos: "bottom-left",
    delay: "2.2s",
    decorative: true,
  },
  {
    src: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    pos: "middle-left",
    delay: "2.8s",
    decorative: true,
  },
];

export default function Hero() {
  return (
    <HeroSection
      id="inicio"
      role="region"
      aria-label="Seção principal da página inicial"
    >
      <HeroContent>
        <HeroHeadline>
          Viva no Flow — saúde física, mental e emocional no dia a dia
        </HeroHeadline>

        <HeroSubheadline>
          Conteúdos práticos sobre sono, ansiedade, alimentação, movimento
          e bem-estar, com receitas e recomendações de produtos que
          realmente podem fazer diferença na sua rotina.
        </HeroSubheadline>

        <HeroButton
          href="/blog"
          aria-label="Ir para o blog e conferir conteúdos de saúde e bem-estar"
        >
          Começar pelo blog →
        </HeroButton>
      </HeroContent>

      <HeroImageWrapper aria-hidden="false">
        <HeroImage
          src="https://images.pexels.com/photos/1005456/pexels-photo-1005456.jpeg"
          alt="Pessoa saudável praticando exercício ao ar livre"
          loading="lazy"
          decoding="async"
        />

        {floatingImages.map((img, i) => (
          <FloatingImage
            key={i}
            src={img.src}
            alt={img.decorative ? "" : `Ilustração ${i + 1}`}
            position={img.pos}
            delay={img.delay}
            loading="lazy"
            decoding="async"
            aria-hidden={img.decorative ? "true" : "false"}
          />
        ))}
      </HeroImageWrapper>
    </HeroSection>
  );
}
