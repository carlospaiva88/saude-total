import SectionCard from "../../components/Calculadora/shared/SectionCard";
import { Link } from "react-router-dom";

export default function CalculadoraIndex() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Calculadoras de Saúde</h1>
      <p>Escolha uma das ferramentas abaixo:</p>

      <SectionCard>
        <h2>Índice de Massa Corporal (IMC)</h2>
        <p>Calcule seu IMC e descubra seu estado nutricional.</p>
        <Link to="/calculadora/imc">Acessar IMC</Link>
      </SectionCard>

      <SectionCard>
        <h2>Taxa Metabólica Basal (TMB)</h2>
        <p>Descubra quantas calorias seu corpo gasta em repouso.</p>
        <Link to="/calculadora/tmb">Acessar TMB</Link>
      </SectionCard>

      <SectionCard>
        <h2>Gasto Calórico Diário</h2>
        <p>Calcule seu gasto energético total com base na TMB + atividade.</p>
        <Link to="/calculadora/calorias">Acessar Calculadora</Link>
      </SectionCard>
    </div>
  );
}
