import styled from "styled-components";
import { Link } from "react-router-dom";

const Box = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 32px;
`;

const Item = styled(Link)`
  display: block;
  padding: 16px;
  background: #f6f9f7;
  border-radius: 12px;
  margin-top: 12px;
  text-decoration: none;
  color: #222;
  font-weight: 500;

  &:hover {
    background: #e8f5ee;
  }
`;

export default function MiniCalculadoras() {
  return (
    <Box>
      <h3>Calculadoras Rápidas</h3>

      <Item to="/calculadora/imc">Calcular IMC</Item>
      <Item to="/calculadora/calorica">Calcular Calorias Diárias</Item>
    </Box>
  );
}
