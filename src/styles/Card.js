import styled from "styled-components";

export const CardBase = styled.article`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  user-select: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 160px;
  }
`;

export const CardBody = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 1.32rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const CardSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondaryDark};
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  font-style: italic;
`;

export const CardDescription = styled.p`
  font-size: 0.97rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  flex-grow: 1;
  min-height: 65px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const CardPrice = styled.p`
  font-size: 1.08rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin-bottom: 0.4rem;
`;

export const CardScience = styled.p`
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-style: italic;
  margin-bottom: 0.7rem;
`;

export const CardButton = styled.a`
  display: inline-block;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.6rem 1.25rem;
  text-align: center;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: background ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadow.xs};

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
