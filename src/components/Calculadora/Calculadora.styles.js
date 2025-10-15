import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {opacity:0; transform: translateY(10px);}
  to {opacity:1; transform: translateY(0);}
`;

export const CalculadorasWrapper = styled.section`
  max-width: 960px;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
  animation: ${fadeInUp} 0.6s ease;
`;

export const Title = styled.h2`
  color: #2a6f61;
  font-weight: 700;
  font-size: 2.4rem;
  margin-bottom: 0.3rem;
`;

export const Subtitle = styled.p`
  color: #506068;
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

export const CalculadoraCard = styled.div`
  background: #f8fcfb;
  border-radius: 18px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 18px rgba(42, 157, 143, 0.1);
  width: 270px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  h3 {
    color: #2a6f61;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.3rem;
  }

  &:hover {
    box-shadow: 0 14px 36px rgba(42, 157, 143, 0.25);
    transform: translateY(-6px);
  }
`;

export const ActionButton = styled.a`
  display: inline-block;
  background: linear-gradient(90deg, #43aa8b, #90be6d);
  border-radius: 50px;
  padding: 0.85rem 2rem;
  color: white;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(67, 170, 139, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 16px 40px rgba(67, 170, 139, 0.6);
  }
`;
