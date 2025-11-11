import styled from "styled-components";

export const ReceitaDetalhe = styled.div`
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
`;

export const Breadcrumb = styled.nav`
  font-size: 0.9rem;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ReceitaHero = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    object-fit: cover;
  }

  .receita-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    span {
      display: inline-block;
      margin-right: 0.8rem;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }
  }
`;

export const ReceitaConteudo = styled.div`
  section {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 0.6rem;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      display: inline-block;
      padding-bottom: 0.2rem;
    }

    ul,
    ol {
      margin-left: 1.5rem;

      li {
        margin-bottom: 0.4rem;
      }
    }
  }
`;

export const ReceitasRelacionadas = styled.div`
  margin-top: 3rem;

  h3 {
    margin-bottom: 1rem;
  }

  .grid-relacionadas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }

  .card-relacionada {
    text-decoration: none;
    color: inherit;
    border-radius: 12px;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.03);
    }

    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
    }

    p {
      text-align: center;
      padding: 0.8rem;
      font-weight: 500;
    }
  }
`;
