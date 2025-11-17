import styled from "styled-components";

// Container principal da página, centralizado e com padding responsivo
export const PageContainer = styled.div`
  padding: 2rem 4rem;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 1rem 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

// Hero banner impactante e espaçado
export const HeroSection = styled.div`
  width: 100%;
  min-height: 320px;
  padding: 5rem 2rem 3rem; // espaço topo para navbar
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.gradients.hero};
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.15);
  margin-bottom: 3rem;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 900;
    font-size: 3.5rem;
    max-width: 700px;
    line-height: 1.1;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    margin-bottom: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      font-size: 2.4rem;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.8rem;
    }
  }

  p {
    font-weight: 400;
    font-size: 1.25rem;
    max-width: 500px;
    opacity: 0.85;
  }
`;

export const HeroContent = styled.div`
  max-width: 700px;
`;

// Breadcrumbs com cor e espaçamento do tema
export const BreadcrumbsWrapper = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

// MainContent flexível, sidebar + conteúdo, responsivo
export const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

// Sidebar fixa e responsiva estilizada por theme
export const Sidebar = styled.aside`
  width: 220px;
  max-width: 100%;
  min-width: 180px;
  flex-shrink: 0;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  label {
    display: block;
    margin-bottom: 0.4rem;
    cursor: pointer;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;

    input {
      margin-right: 0.6rem;
      cursor: pointer;
    }
  }

  input[type="range"] {
    width: 100%;
    margin-top: 0.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 100%;
    min-width: 0;
    margin-bottom: 1rem;
  }
`;

// Área flexível do conteúdo
export const ContentArea = styled.div`
  flex: 1 1 0;
  min-width: 300px;
`;

// Seção com sombra leve e padding confortável
export const Section = styled.div`
  margin-bottom: 2rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  padding: 1rem 1.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.8rem 0.6rem;
  }
`;

// Título das seções com borda inferior e tema
export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.dark};
`;

// Menu de categorias flexível com wrap
export const CategoryMenu = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

// Botões estilo categoria com hover e estado ativo
export const CategoryItem = styled.a`
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.background};
  border: 1.5px solid transparent;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover,
  &.active {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

// Container do carrossel com scroll oculto e scrollbar estilizado
export const CarouselContainer = styled.div`
  overflow-x: hidden;
  max-width: 100%;
  position: relative;
  padding: 0.5rem 1.5rem;
`;

// Track do carrossel com flex para scroll e espaçamento
export const CarouselTrack = styled.div`
  display: flex;
  gap: 1rem;
  scroll-behavior: smooth;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

// Item do carrossel com tamanho fixo proporcional
export const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  max-width: 220px;
`;

// Grid responsivo de produtos
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// Botões de navegação do carrossel
export const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.25);
  color: ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: background ${({ theme }) => theme.transitions.fast};
  z-index: 10;

  &:hover {
    background: rgba(0,0,0,0.45);
  }

  &.left {
    left: 8px;
  }
  &.right {
    right: 8px;
  }
`;
