import styled from "styled-components";

export const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(135deg, #2a9d8f 0%, #00b4d8 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

export const HeroContent = styled.div`
  max-width: 800px;
`;

export const HeroHeadline = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const HeroSubheadline = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

export const HeroButton = styled.a`
  padding: 1rem 2.5rem;
  background: linear-gradient(45deg, #90be6d, #43aa8b);
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(45deg, #43aa8b, #90be6d);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
`;
