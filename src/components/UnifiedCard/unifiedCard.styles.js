import styled from "styled-components";

export const CardWrapper = styled.article`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  user-select: none;
`;

export const CardBody = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardDescription = styled.p`
  font-size: 0.97rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  flex-grow: 1;
  min-height: 70px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.6rem;
`;

export const CardButton = styled.button`
  padding: 0.7rem 1.4rem;
  border-radius: 30px;
  font-weight: 600;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const CardSticker = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.28rem 0.7rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
`;
