import React, { useState } from "react";
import InputGroup from "../shared/InputGroup";
import SelectGroup from "../shared/SelectGroup";
import SectionCard from "../shared/SectionCard";
import { calcularTMB, calcularCalorias, calcularMacros } from "./caloricaUtils";
import styled from "styled-components";

export default function CaloricaForm({ onResult }) {
  const [form, setForm] = useState({
    sexo: "masculino",
    peso: "",
    altura: "",
    idade: "",
    atividade: "leve",
    objetivo: "manter"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const tmb = calcularTMB(form);
    const manutencao = calcularCalorias(tmb, form.atividade);
    const macros = calcularMacros(manutencao, form.objetivo);

    onResult({
      tmb,
      manutencao,
      ...macros,
      goal: form.objetivo
    });
  }

  return (
    <SectionCard title="Preencha seus dados">
      <Grid>
        <SelectGroup
          label="Sexo"
          value={form.sexo}
          onChange={handleChange}
          options={[
            { value: "masculino", label: "Masculino" },
            { value: "feminino", label: "Feminino" }
          ]}
          name="sexo"
        />

        <InputGroup
          label="Peso (kg)"
          value={form.peso}
          onChange={handleChange}
          name="peso"
        />

        <InputGroup
          label="Altura (cm)"
          value={form.altura}
          onChange={handleChange}
          name="altura"
        />

        <InputGroup
          label="Idade"
          value={form.idade}
          onChange={handleChange}
          name="idade"
        />

        <SelectGroup
          label="Nível de atividade"
          value={form.atividade}
          onChange={handleChange}
          name="atividade"
          options={[
            { value: "leve", label: "Leve" },
            { value: "moderada", label: "Moderada" },
            { value: "intensa", label: "Intensa" },
          ]}
        />

        <SelectGroup
          label="Objetivo"
          value={form.objetivo}
          onChange={handleChange}
          name="objetivo"
          options={[
            { value: "manter", label: "Manter peso" },
            { value: "perder", label: "Perder peso" },
            { value: "ganhar", label: "Ganhar peso" },
          ]}
        />
      </Grid>

      <SubmitBtn onClick={handleSubmit}>
        Calcular
      </SubmitBtn>
    </SectionCard>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.9rem;
  border: none;
  font-size: 1.05rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
