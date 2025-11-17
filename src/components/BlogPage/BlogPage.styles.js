import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.article`
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
`;

export const Breadcrumbs = styled.nav`
  font-size: 0.9rem;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.primary || "#2a9d8f"};
    text-decoration: none;
  }

  span.sep {
    margin: 0 .5rem;
    color: ${({ theme }) => theme.colors.muted || "#80939a"};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.heading || "#264653"};
  line-height: 1.2;
  margin: 0 0 .5rem;
`;

export const Meta = styled.div`
  color: ${({ theme }) => theme.colors.subtext || "#52727a"};
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
`;

export const ArticleBody = styled.div`
  color: ${({ theme }) => theme.colors.body || "#2f4f4f"};
  font-size: 1.06rem;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 2rem;

  p { margin: 0 0 1rem; }
  ul { padding-left: 1.25rem; margin: 0 0 1rem; }
`;

export const Cover = styled.img`
  width: 100%;
  height: auto;
  border-radius: 14px;
  box-shadow: 0 10px 26px rgba(38, 70, 83, 0.15);
  margin: 0 0 1.5rem;
`;

/* ==========================
   Bloco de Calculadoras
   ========================== */
export const ToolsSection = styled.section`
  margin: 3rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.gradients.soft};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

export const ToolsTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const ToolsSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

export const CalculatorsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const NotFound = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 3rem 1.25rem 6rem;
  color: ${({ theme }) => theme.colors.textDark || "#264653"};
`;
