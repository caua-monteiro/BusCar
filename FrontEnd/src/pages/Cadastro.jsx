import React from "react";
import "./Login.css"; // Mantendo o mesmo CSS do Login
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import carro from "../assets/car-login.png";

export default function Cadastro() {
  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url(${carro})` }}>
      
      <div className="glass-login-card">
        
        {/* LOGO NO TOPO */}
        <div className="login-logo-container">
          <img src={logo} alt="BusCar Logo" className="login-logo-img" />
        </div>

        <h2>Criar Conta</h2>
        <p className="login-subtitle single-line">Cadastre-se para começar a alugar ou anunciar</p>

        <form onSubmit={(e) => e.preventDefault()}>
          
          <div className="input-field-group">
            <label htmlFor="nome">Nome Completo</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <Input type="text" id="nome" placeholder="Digite seu nome completo" />
            </div>
          </div>

          <div className="input-field-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <span className="input-icon">✉</span>
              <Input type="email" id="email" placeholder="Digite seu e-mail" />
            </div>
          </div>

          {/* NOVO CAMPO: CPF */}
<div className="input-field-group">
  <label htmlFor="cpf">CPF</label>
  <div className="input-with-icon">
    <span className="input-icon">📋</span> {/* Trocado aqui! */}
    <Input type="text" id="cpf" placeholder="000.000.000-00" />
  </div>
</div>

          {/* NOVO CAMPO: TELEFONE */}
          <div className="input-field-group">
            <label htmlFor="telefone">Telefone</label>
            <div className="input-with-icon">
              <span className="input-icon">📞</span>
              <Input type="tel" id="telefone" placeholder="(42) 99999-9999" />
            </div>
          </div>

          {/* NOVO CAMPO: ENDEREÇO */}
          <div className="input-field-group">
            <label htmlFor="endereco">Endereço</label>
            <div className="input-with-icon">
              <span className="input-icon">📍</span>
              <Input type="text" id="endereco" placeholder="Rua, Número, Bairro" />
            </div>
          </div>

          <div className="input-field-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <Input type="password" id="password" placeholder="Crie uma senha segura" />
            </div>
          </div>

          <Button 
            className="login-btn-gradient" 
            onClick={() => window.location.href = "/"}
          >
            Cadastrar
          </Button>
        </form>

        <div className="login-card-inner-footer">
          <p>Já possui uma conta? <Link to="/">Faça login</Link></p>
        </div>

      </div>

    </div>
  );
}