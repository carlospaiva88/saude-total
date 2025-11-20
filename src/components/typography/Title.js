import styled from "styled-components";

export const PageTitle = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.heading};
  text-align: center;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 3rem 0 1.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;
