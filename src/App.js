import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

// Layout
import SectionWrapper from "./Layout/SectionWrapper"

// Componentes comuns
import Navbar from "./components/Navbar/Navbar";
import NavbarSpacer from "./components/Navbar/NavbarSpacer";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";


// Home components
import Hero from "./components/Hero/Hero";
import HealthTips from "./components/HealthTips/HealthTips";
import HomeReceitasSection from "./components/Receitas/HomeReceitasSection";
import TravelHighlights from "./components/TravelHighlights/TravelHighlights";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import BlogPage from "./components/BlogPage/BlogPage";

import viagensData from "./data/viagens";

// Páginas Receitas
import ReceitasPage from "./components/Receitas/ReceitasPage";
import ReceitaPage from "./components/Receitas/ReceitaPage";
import ReceitasCategoria from "./components/Receitas/ReceitasCategoria";


// Calculadoras
import CalculadorasIndex from "./pages/Calculadoras/CalculadoraIndex"
import CalculadoraIMC from "./components/Calculadora/CalculadoraIMC"
import CalculadoraCalorica from "./components/Calculadora/CalculadoraCalorica"



// Viagens
import ViagensHome from "./pages/ViagensHome";
import ViagensCategoria from "./pages/ViagensCategoria";
import ViagemPage from "./pages/ViagemPage";

// Sobre
import Sobre from "./components/Sobre/Sobre";

// Lazy Loading
const BlogHome = lazy(() => import("./components/BlogPage/BlogHome"));
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
          <ScrollToTop />

          <Suspense fallback={<div>Carregando...</div>}>

            <Routes>

              {/* HOME */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <NavbarSpacer />

                    <SectionWrapper>
                      <Hero />
                    </SectionWrapper>

                    <SectionWrapper>
                      <HealthTips />
                    </SectionWrapper>

                 

                    <SectionWrapper>
                      <HomeReceitasSection />
                    </SectionWrapper>

                    <SectionWrapper>
                      <TravelHighlights travels={viagensData} />
                    </SectionWrapper>

                 

                    <FinalCTA />
                    <Footer />
                  </>
                }
              />

              {/* PRODUTOS */}
              <Route path="/produtos" element={<ProductsPage />} />

              {/* BLOG */}
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:categoria" element={<Categoria />} />
              <Route path="/blog/:categoria/:subcategoria" element={<Subcategoria />} />
              <Route path="/blog/:categoria/:subcategoria/:slug" element={<Artigo />} />
              <Route path="/blog/:categoria/:subcategoria/:slug" element={<BlogPage />} />


              {/* CALCULADORAS */}
              <Route path="/calculadora" element={<CalculadorasIndex />} />
              <Route path="/calculadora/imc" element={<CalculadoraIMC />} />
              <Route path="/calculadora/calorica" element={<CalculadoraCalorica />} />

              {/* RECEITAS */}
              <Route path="/receitas" element={<ReceitasPage />} />
              <Route path="/receitas/categoria/:categoria" element={<ReceitasCategoria />} />
              <Route path="/receitas/:slug" element={<ReceitaPage />} />
              <Route path="/receitas/receita" element={<Navigate to="/receitas" replace />} />

              {/* SOBRE */}
              <Route path="/sobre" element={<Sobre />} />

              {/* VIAGENS */}
              <Route path="/viagens" element={<ViagensHome />} />
              <Route path="/viagens/:categoria" element={<ViagensCategoria />} />
              <Route path="/viagens/:categoria/:slug" element={<ViagemPage />} />

              {/* REDIRECIONAMENTOS ANTIGOS */}
              <Route path="/dicas-saude" element={<Navigate to="/blog" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
