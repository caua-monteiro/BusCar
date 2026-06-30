import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

// Importando a logo do projeto conforme sua árvore de arquivos
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO DO APP (CLICÁVEL PARA VOLTAR PRA HOME) */}
        <div className="navbar-logo" onClick={() => window.location.href = "/home"}>
          <img src={logo} alt="BusCar Logo" />
        </div>

        {/* LINKS DE NAVEGAÇÃO CENTRAL/DIREITA */}
        <div className="navbar-links">
          <Link to="/home" className="nav-item">Início</Link>
          <Link to="/busca" className="nav-item">🔍 Buscar Carros</Link>
          <Link to="/disponibilizar" className="nav-item">🔑 Anunciar</Link>
          <Link to="/meusanuncios" className="nav-item">🚘 Meus Anúncios</Link>
          <Link to="/chat" className="nav-item">💬 Chat</Link>
          
          {/* O LOCAL PARA IR PARA AS CONFIGURAÇÕES (PERFIL) */}
          <Link to="/configuracoes" className="nav-item nav-profile">
            ⚙️ Configurações
          </Link>
        </div>

      </div>
    </nav>
  );
}