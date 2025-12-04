import styled from "styled-components";

export default function AdBlock({ type = "horizontal" }) {
  return (
    <AdContainer type={type}>
      <span>🪧 Espaço reservado para anúncio</span>
    </AdContainer>
  );
}

const AdContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  background: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  padding: ${({ type }) => (type === "horizontal" ? "2rem 0" : "4rem 0")};
  color: #666;
  font-style: italic;
`;
