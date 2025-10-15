import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(25px);}
  to { opacity: 1; transform: translateY(0);}
`;

export const PageWrapper = styled.section`
  max-width: 1000px;
  margin: 3rem auto 4rem;
  padding: 0 1.2rem;
  animation: ${fadeInUp} 0.5s;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  color: #264653;
  font-weight: 700;
  margin-bottom: 0.3rem;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1.16rem;
  color: #448763;
  font-weight: 600;
  margin-bottom: 2.4rem;
  text-align: center;
`;

export const TwoColumns = styled.section`
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 860px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

export const CalculatorCard = styled.div`
  background: #f8fcfb;
  box-shadow: 0 8px 30px rgba(42, 157, 143, 0.09);
  border-radius: 18px;
  padding: 2.2rem 1.7rem;
  flex: 1 1 340px;
  max-width: 430px;
  margin: 0 auto;
`;

export const InfoCard = styled.div`
  background: #f8fcfb;
  box-shadow: 0 8px 30px rgba(42, 157, 143, 0.09);
  border-radius: 18px;
  padding: 2.2rem 1.7rem;
  flex: 1 1 320px;
  max-width: 410px;
  margin: 0 auto;

  h3 {
    margin-bottom: 1rem;
    color: #2a6f61;
    font-weight: 700;
    font-size: 1.3rem;
  }
  h4 {
    margin-top: 1.5rem;
    color: #43aa8b;
    font-size: 1.1rem;
    font-weight: 600;
  }
  p, ul {
    font-size: 1rem;
    color: #506068;
  }
  ul {
    margin-top: 0.8rem;
    margin-left: 1.1rem;
  }
`;

export const InfoBlock = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 0.6rem;
    color: #2a6f61;
  }

  p, ul {
    font-weight: 500;
    font-size: 1rem;
    color: #506068;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  ul {
    margin-top: 0.3rem;
    padding-left: 1.2rem;
  }

  ul li {
    margin-bottom: 0.4rem;
  }
`;

export const ResultBox = styled.div`
  margin: 2.7rem auto 0;
  background: linear-gradient(90deg, #def2e9, #f6fefb);
  border-radius: 14px;
  padding: 1.2rem 1.8rem;
  text-align: center;
  color: #2a6f61;
  font-weight: 600;
  font-size: 1.15rem;
  max-width: 520px;
  box-shadow: 0 2px 12px rgba(42, 157, 143, 0.08);
  animation: ${fadeInUp} 0.5s;
`;

export const CTAButton = styled.a`
  display: inline-block;
  margin: 1.5rem auto 0;
  padding: 1rem 2.3rem;
  background: linear-gradient(90deg, #43aa8b, #90be6d);
  border-radius: 44px;
  color: white;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(67,170,139,0.18);
  transition: background 0.3s, transform 0.25s;

  &:hover {
    background: #2a6f61;
    transform: scale(1.07);
  }
`;

export const Recommendations = styled.div`
  margin: 2.2rem 0 0;
  padding-top: 1.2rem;
  border-top: 2px dashed #b2f7ef;

  h4 {
    color: #2a9d8f;
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
  }

  ul {
    list-style: disc;
    margin-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #2a9d8f;
    text-decoration: underline;
  }
`;
