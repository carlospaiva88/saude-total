import styled from "styled-components";

// Card base padronizado (inspirado nos cards Viagem/Produto)
export const BlogCardBase = styled.article`
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 15px rgba(42, 157, 143, 0.10);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 28px rgba(42, 157, 143, 0.17);
  }
`;

export const BlogCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  user-select: none;
  border-bottom: 1px solid #e9f5f2;
`;

export const BlogCardBody = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
`;

export const BlogCardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
  color: #2a6f61;
  font-weight: 600;
`;

export const BlogCardDescription = styled.p`
  font-size: 0.96rem;
  color: #40514e;
  margin-bottom: 0.6rem;
  flex-grow: 1;
`;

export const BlogCardLink = styled.a`
  display: inline-block;
  font-weight: 600;
  color: #43aa8b;
  text-decoration: none;
  margin-top: 0.7rem;
  font-size: 1rem;

  &:hover, &:focus {
    color: #2a6f61;
    text-decoration: underline;
  }
`;
