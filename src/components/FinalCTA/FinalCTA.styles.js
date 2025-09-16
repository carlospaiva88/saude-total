// FinalCTA.styles.js
import styled from "styled-components";

export const FinalCTAWrapper = styled.section`
  background: linear-gradient(135deg, #90be6d, #43aa8b);
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

export const FinalCTACard = styled.div`
  background: white;
  color: #264653;
  padding: 3rem 2rem;
  border-radius: 20px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2a9d8f;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
`;

export const FinalButton = styled.a`
  padding: 1rem 2.5rem;
  background: #e76f51;
  color: white;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  text-decoration: none;

  &:hover {
    background: #f4a261;
    transform: scale(1.05);
  }
`;
