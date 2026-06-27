import React from "react";
import "./Login.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import carro from "../assets/car-login.png";

export default function Login() {
  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url(${carro})` }}>
      
      <div className="glass-login-card">
        
        {/* LOGO NO TOPO */}
        <div className="login-logo-container">
          <img src={logo} alt="BusCar Logo" className="login-logo-img" />
        </div>

        <h2>Boas-vindas ao BusCar</h2>
        {/* Adicionada a classe single-line para travar em uma linha só */}
        <p className="login-subtitle single-line">Insira suas credenciais para acessar a plataforma</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-field-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <span className="input-icon">✉</span>
              <Input type="email" id="email" placeholder="admin" />
            </div>
          </div>

          <div className="input-field-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <Input type="password" id="password" placeholder="********" />
            </div>
          </div>

          <div className="forgot-password-link">
            <a href="/recuperar">Esqueceu a senha?</a>
          </div>

          <Button 
            className="login-btn-gradient" 
            onClick={() => window.location.href = "/home"}
          >
            Entrar
          </Button>
        </form>

        {/* O CADASTRE-SE AGORA FICA AQUI DENTRO, NO RODAPÉ DO CARD */}
        <div className="login-card-inner-footer">
          <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>

      </div>

    </div>
  );
}