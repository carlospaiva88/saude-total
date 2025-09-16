import styled, { keyframes } from "styled-components";

export const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: #264653;
  font-size: 2.2rem;
  font-weight: 700;
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  justify-items: center;
`;

export const TestimonialCard = styled.div`
  background: #f1f6f4;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(42, 157, 143, 0.15);
  transform: rotate(0deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:nth-child(1) { transform: rotate(-2deg); }
  &:nth-child(3) { transform: rotate(2deg); }

  &:hover {
    transform: translateY(-12px) rotate(0deg);
    box-shadow: 0 16px 35px rgba(42, 157, 143, 0.3);
  }
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 4px solid #43aa8b;
`;

export const ClientName = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2a6f61;
  margin-bottom: 0.5rem;
`;

export const TestimonialText = styled.p`
  font-style: italic;
  color: #264653;
  line-height: 1.6;
  font-size: 1rem;
`;
