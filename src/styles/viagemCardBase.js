import styled from "styled-components";

// Card base reutilizável
export const ViagemCardBase = styled.article`
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 15px rgba(42, 157, 143, 0.09);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 28px rgba(42, 157, 143, 0.13);
  }
`;

export const ViagemCardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  user-select: none;
  border-bottom: 1px solid #e9f5f2;
`;

export const ViagemCardBody = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
`;

export const ViagemCardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
  color: #2a6f61;
  font-weight: 600;
`;

export const ViagemCardSubtitle = styled.p`
  color: #496c5f;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

export const ViagemCardDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
  margin-bottom: 1rem;
  flex-grow: 1;
  min-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* limita a 3 linhas */
  -webkit-box-orient: vertical;
`;
