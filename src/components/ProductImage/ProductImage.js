import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
  height: 280px; 
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  user-select: none;
  pointer-events: none;
`;

export default function ProductImage({ src, alt }) {
  return <StyledImage src={src} alt={alt} loading="lazy" />;
}
