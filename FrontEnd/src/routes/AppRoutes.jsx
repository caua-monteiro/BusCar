import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; // Importada aqui!
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import Busca from "../pages/Busca";
import Disponibilizar from "../pages/Disponibilizar";
import Configuracoes from "../pages/Configuracoes";

export default function AppRoutes() {
  const location = useLocation();
  
  // Oculta a navbar nas telas de login e cadastro para manter o visual do card limpo
  const esconderNavbar = location.pathname === "/" || location.pathname === "/cadastro";

  return (
    <>
      {!esconderNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path={esconderNavbar ? "/home" : "/home"} element={<Home />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/disponibilizar" element={<Disponibilizar />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </>
  );
}