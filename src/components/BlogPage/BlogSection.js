import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CardBase, CardImage, CardBody, CardTitle, CardDescription } from "../CardBase/CardBase";

export default function BlogSection({ title, description, image, link }) {
  const navigate = useNavigate();

  return (
    <SectionContainer tabIndex={0} role="button" onClick={() => navigate(link)} onKeyDown={(e) => { if(e.key === "Enter") navigate(link); }}>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <ContentWrapper>
        <SectionTitle>{title}</SectionTitle>
        <SectionText>{description}</SectionText>
        <CTA>Ver Artigo Completo &rarr;</CTA>
      </ContentWrapper>
    </SectionContainer>
  );
}

const SectionContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.2s;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadow.md};
    outline: none;
    transform: translateY(-3px);
  }

  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

const CTA = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: underline;
  align-self: flex-start;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
