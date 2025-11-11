import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme"; 

// Componentes comuns
import Navbar from "./components/Navbar/Navbar";
import NavbarSpacer from "./components/Navbar/NavbarSpacer";

import Hero from "./components/Hero/Hero";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import Footer from "./components/Footer/Footer";
import HealthTips from "./components/HealthTips/HealthTips";
import Receitas from "./components/Receitas/Receitas";
import Sobre from "./components/Sobre/Sobre";
import ReceitaPage from "./components/Receitas/ReceitaPage";
import TravelHighlights from "./components/TravelHighlights/TravelHighlights";
import viagensData from "./data/viagens";
import ReceitasCategoria from "./components/Receitas/ReceitasCategoria"

import ViagemPage from "./pages/ViagemPage";
import ViagensHome from "./pages/ViagensHome";
import ViagensCategoria from "./pages/ViagensCategoria";



import CalculadoraCaloricaPage from './components/Calculadora/CalculadoraCaloricaPage';

import CalculadorasInterativas from './components/Calculadora/CalculadorasInterativas';
import CalculadoraIMCPage from "./components/Calculadora/CalculadoraIMCPage";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";
import HealthyRecipes from "./components/HealthyRecipes/HealthyRecipes";

// Lazy loading das páginas
const BlogHome = lazy(() => import("./pages/BlogHome"));
const Categoria = lazy(() => import("./pages/Categoria"));
const Subcategoria = lazy(() => import("./pages/SubCategoria"));
const Artigo = lazy(() => import("./pages/Artigo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductsPage = lazy(() => import("./components/ProductsPage/ProductsPage"));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
           
                  <Navbar />
                  <NavbarSpacer /> 
                  <Hero />
                  <HealthTips />
                  <CalculadorasInterativas />
                  <HealthyRecipes />
                  <TravelHighlights travels = {viagensData}/>                  
                  <ProductShowcase />
                  <FinalCTA />
                  <Footer />
            
                </>
              }
            />

            {/* Produtos */}
            <Route path="/produtos" element={<ProductsPage />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:categoria" element={<Categoria />} />
            <Route path="/blog/:categoria/:subcategoria" element={<Subcategoria />} />
            <Route
              path="/blog/:categoria/:subcategoria/:slug"
              element={<Artigo />}
            />
            <Route path="/calculadora-imc" element={<CalculadoraIMCPage />} />
            <Route path="/calculadora-calorica" element={<CalculadoraCaloricaPage />} />

            <Route path="/receitas" element={<Receitas />} />
            <Route path="/receitas/:categoria" element={<ReceitasCategoria />} />
            <Route path="/receitas/:slug" element={<ReceitaPage />} />



            <Route path="/sobre" element={<Sobre />} />
                  
            <Route path="/viagens" element={<ViagensHome />} />
            <Route path="/viagens/:categoria" element={<ViagensCategoria />} />
            <Route path="/viagens/:categoria/:slug" element={<ViagemPage />} />


            {/* Redirecionamentos antigos */}
            <Route path="/dicas-saude" element={<Navigate to="/blog" replace />} />
            <Route
              path="/dicas-saude/:categoria"
              element={<Navigate to="/blog/:categoria" replace />}
            />
            <Route
              path="/dicas-saude/:categoria/:subcategoria"
              element={<Navigate to="/blog/:categoria/:subcategoria" replace />}
            />
            <Route
              path="/dicas-saude/:categoria/:subcategoria/:slug"
              element={<Navigate to="/blog/:categoria/:subcategoria/:slug" replace />}
            />

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
