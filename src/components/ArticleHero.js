// src/components/Article/ArticleHero.jsx
import React from "react";
import styled from "styled-components";

export default function ArticleHero({ article }) {
  return (
    <Hero role="banner" aria-labelledby="article-title">
      <HeroInner>
        <Meta>
          <Category>{article.category}</Category>
          <Date>{article.date}</Date>
          <ReadingTime>{article.readingTime}</ReadingTime>
        </Meta>

        <Title id="article-title">{article.title}</Title>
        {article.excerpt && <Excerpt>{article.excerpt}</Excerpt>}

        {article.image && (
          <HeroImageWrapper>
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              decoding="async"
              width="1200"
              height="675"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder-16x9.png"; }}
            />
          </HeroImageWrapper>
        )}
      </HeroInner>
    </Hero>
  );
}

const Hero = styled.header`
  background: ${({ theme }) => theme.gradients.soft};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;

const HeroInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Meta = styled.div`
  display:flex;
  gap:0.6rem;
  justify-content:center;
  color: ${({ theme }) => theme.colors.dark};
  opacity: 0.85;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
`;

const Category = styled.span`font-weight:700; color: ${({ theme }) => theme.colors.primaryDark}; text-transform:capitalize;`;
const Date = styled.span``;
const ReadingTime = styled.span``;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0.25rem 0 0.6rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.15;
`;

const Excerpt = styled.p`
  max-width: 68ch;
  margin: 0.4rem auto 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const HeroImageWrapper = styled.figure`
  margin-top: 1rem;
  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    object-fit: cover;
  }
`;
