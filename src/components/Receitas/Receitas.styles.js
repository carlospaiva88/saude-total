import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 100px 2rem 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

export const RecipeCard = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.light};
  overflow: hidden;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadow.medium};
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  h3 {
    margin: 1rem;
  }

  p {
    margin: 0 1rem 1rem;
    color: #555;
  }

  a {
    display: block;
    padding: 0.8rem;
    text-align: center;
    background: ${({ theme }) => theme.gradients.button};
    color: #fff;
    font-weight: bold;
    border-radius: 0 0 16px 16px;
  }
`;
