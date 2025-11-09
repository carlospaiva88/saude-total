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

export default function Hero() {
  return (
    <HeroSection id="inicio">
      <HeroContent>
        <HeroHeadline>
          Viva no Flow — equilíbrio, saúde e bem-estar todos os dias
        </HeroHeadline>
        <HeroSubheadline>
          Descubra dicas, receitas e produtos para transformar corpo e mente.
        </HeroSubheadline>
        <HeroButton href="#blog">Confira nossas dicas de saúde</HeroButton>
      </HeroContent>

      <HeroImageWrapper>
        {/* Imagem principal */}
        <HeroImage
          src="https://images.pexels.com/photos/386024/pexels-photo-386024.jpeg"
          alt="Pessoa saudável fazendo exercício"
          loading="lazy"
        />

        {/* Imagens flutuantes */}
        <FloatingImage
          src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
          alt="Yoga"
          position="top-left"
          delay="0s"
        />
        <FloatingImage
          src="https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg"
          alt="Ciclismo"
          position="top-right"
          delay="1s"
        />
        <FloatingImage
          src="https://images.pexels.com/photos/3076514/pexels-photo-3076514.jpeg"
          alt="Corrida"
          position="bottom-right"
          delay="2s"
        />
       
      </HeroImageWrapper>
    </HeroSection>
  );
}
