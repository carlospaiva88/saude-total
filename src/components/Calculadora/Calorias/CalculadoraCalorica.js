import React, { useState } from "react";
import { CaloricaForm, CaloricaResultado } from "./index";

export default function CalculadoraCalorica() {
  const [resultado, setResultado] = useState(null);

  return (
    <>
      <CaloricaForm onResult={setResultado} />
      <CaloricaResultado resultado={resultado} />
    </>
  );
}
