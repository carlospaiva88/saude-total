// src/components/BlogPage/ContinueExploring.styles.js
import styled from "styled-components";


export const Wrapper = styled.section`
  margin-top: 60px;
  padding: 20px 0;

  h2 {
    font-size: 1.9rem;
    margin-bottom: 22px;
    font-weight: 700;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  overflow: hidden;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 3px 14px rgba(0,0,0,0.12);
  }

  a {
    color: inherit;
    text-decoration: none;
    display: block;
  }
`;

export const Thumb = styled.div`
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
`;

export const Body = styled.div`
  padding: 14px 16px 20px;

  h3 {
    font-size: 1.05rem;
    margin: 6px 0 10px;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    color: #444;
    font-size: 0.9rem;
    line-height: 1.35;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) =>
    props.type === "article"
      ? "#e8f0fe"
      : props.type === "receita"
      ? "#fff3d4"
      : props.type === "product"
      ? "#e5f4e8"
      : "#e0e8ff"};
  color: ${(props) =>
    props.type === "article"
      ? "#1a73e8"
      : props.type === "receita"
      ? "#a97400"
      : props.type === "product"
      ? "#118a2f"
      : "#4454c4"};
`;
