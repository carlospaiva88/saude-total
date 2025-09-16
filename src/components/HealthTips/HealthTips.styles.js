import styled from "styled-components";

export const TipsSection = styled.section`
  padding: 4rem 2rem;
  max-width: 960px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #264653;
`;

export const TipsGrid = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const TipCard = styled.div`
  background: #e9f5f2;
  border-radius: 12px;
  padding: 2rem;
  flex: 1 1 280px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(42, 157, 143, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
  }
`;

export const TipIcon = styled.span`
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  font-size: 48px;
  color: #43aa8b;
  margin-bottom: 1rem;
`;


export const TipTitle = styled.h3`
  margin-bottom: 1rem;
  color: #2a6f61;
`;

export const TipText = styled.p`
  font-size: 1rem;
  color: #2f4f4f;
  line-height: 1.4;
`;
