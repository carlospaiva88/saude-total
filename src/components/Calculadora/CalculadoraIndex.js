// src/pages/Calculadoras/CalculadoraIndex.jsx
import React from "react";
import CalculadorasPanel from "../../components/Calculadora/CalculadorasPanel";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";

export default function CalculadoraIndexPage() {
  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <CalculadorasPanel />
      <Footer />
    </>
  );
}
