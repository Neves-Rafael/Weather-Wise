import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaPesquisa from "@/scenes/Home-page";
import PaginaResultado from "@/scenes/Weather";
import Home from "@/scenes/Home-page";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Se você deseja ter um cabeçalho de navegação, pode adicionar aqui */}
        {/* <Navbar /> */}

        {/* Defina suas rotas usando Route e Switch */}
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Home />} />

          {/* Rota para a página de pesquisa */}
          <Route path="/pesquisa" element={<PaginaPesquisa />} />

          {/* Rota para a página de resultado */}
          <Route path="/resultado" element={<PaginaResultado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
