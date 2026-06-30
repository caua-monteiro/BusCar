import React, { useState } from "react";
import "./Login.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

import logo from "../assets/logo.png";
import carro from "../assets/car-login.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const navigate = useNavigate();

  const validarCampos = () => {
    let novosErros = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) novosErros.email = "Insira um e-mail válido.";
    if (!senha) novosErros.senha = "A senha não pode estar vazia.";
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErroGeral("");
    if (!validarCampos()) return;

    try {
      const res = await login(email, senha);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.usuario));
      navigate("/home");
    } catch (err) {
      setErroGeral(err.response?.data?.error || "E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url(${carro})` }}>
      <div className="glass-login-card">
        <div className="login-logo-container">
          <img src={logo} alt="BusCar Logo" className="login-logo-img" />
        </div>

        <h2>Boas-vindas ao BusCar</h2>
        <p className="login-subtitle single-line">Insira suas credenciais para acessar a plataforma</p>

        {erroGeral && <p style={{ color: "red", textAlign: "center", fontSize: "0.9em", background: "#fee", padding: "5px", borderRadius: "5px" }}>{erroGeral}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-field-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <span className="input-icon">✉</span>
              <Input 
                type="email" 
                id="email" 
                placeholder="admin" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErros({ ...erros, email: "" });
                }}
              />
            </div>
            {erros.email && <span className="field-error">{erros.email}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="password">Senha</label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <Input 
                type="password" 
                id="password" 
                placeholder="********" 
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErros({ ...erros, senha: "" });
                }}
              />
            </div>
            {erros.senha && <span className="field-error">{erros.senha}</span>}
          </div>

          <div className="forgot-password-link">
            <a href="/recuperar">Esqueceu a senha?</a>
          </div>

          <Button type="submit" className="login-btn-gradient">
            Entrar
          </Button>
        </form>

        <div className="login-card-inner-footer">
          <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}