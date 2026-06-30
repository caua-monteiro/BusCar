import React, { useState } from "react";
import "./Login.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { cadastrar } from "../services/authService";
import { isValidCPF, isValidCNH } from "../utils/validators";
import logo from "../assets/logo.png";
import carro from "../assets/car-login.png";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
    cnh: "",
    senha: ""
  });
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Limpa o erro do campo quando o usuário digita
    setErros({ ...erros, [e.target.id]: "" });
  };

  const validarCampos = () => {
    let novosErros = {};
    if (!formData.nome || formData.nome.length < 2) novosErros.nome = "O nome precisa ter pelo menos 2 caracteres.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) novosErros.email = "Insira um e-mail válido.";
    if (!formData.cpf || !isValidCPF(formData.cpf)) novosErros.cpf = "CPF inválido.";
    if (!formData.cnh || !isValidCNH(formData.cnh)) novosErros.cnh = "CNH inválida.";
    if (!formData.telefone || formData.telefone.replace(/\D/g, '').length < 10) novosErros.telefone = "Telefone inválido (mínimo 10 dígitos).";
    if (!formData.endereco || formData.endereco.length < 5) novosErros.endereco = "O endereço deve ser mais detalhado.";
    if (!formData.senha || formData.senha.length < 6) novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErroGeral("");
    if (!validarCampos()) return;

    try {
      await cadastrar(formData);
      alert("Cadastro realizado com sucesso! Faça o login.");
      navigate("/");
    } catch (err) {
      if (err.response?.data?.error) {
        setErroGeral("Erro no servidor: Verifique se o e-mail ou CPF já estão em uso.");
      } else {
        setErroGeral("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url(${carro})` }}>
      <div className="glass-login-card">
        <div className="login-logo-container">
          <img src={logo} alt="BusCar Logo" className="login-logo-img" />
        </div>

        <h2>Criar Conta</h2>
        <p className="login-subtitle single-line">Cadastre-se para começar a alugar ou anunciar</p>

        {erroGeral && <p style={{ color: "red", textAlign: "center", fontSize: "0.9em", background: "#fee", padding: "5px", borderRadius: "5px" }}>{erroGeral}</p>}

        <form onSubmit={handleCadastro}>
          <div className="input-field-group">
            <label htmlFor="nome">Nome Completo</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <Input type="text" id="nome" placeholder="Digite seu nome completo" value={formData.nome} onChange={handleChange} />
            </div>
            {erros.nome && <span className="field-error">{erros.nome}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-with-icon">
              <span className="input-icon">✉</span>
              <Input type="email" id="email" placeholder="Digite seu e-mail" value={formData.email} onChange={handleChange} />
            </div>
            {erros.email && <span className="field-error">{erros.email}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="cpf">CPF</label>
            <div className="input-with-icon">
              <span className="input-icon">📋</span>
              <Input type="text" id="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} />
            </div>
            {erros.cpf && <span className="field-error">{erros.cpf}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="cnh">CNH</label>
            <div className="input-with-icon">
              <span className="input-icon">🚗</span>
              <Input type="text" id="cnh" placeholder="Número da CNH" value={formData.cnh} onChange={handleChange} />
            </div>
            {erros.cnh && <span className="field-error">{erros.cnh}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="telefone">Telefone</label>
            <div className="input-with-icon">
              <span className="input-icon">📞</span>
              <Input type="tel" id="telefone" placeholder="(42) 99999-9999" value={formData.telefone} onChange={handleChange} />
            </div>
            {erros.telefone && <span className="field-error">{erros.telefone}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="endereco">Endereço</label>
            <div className="input-with-icon">
              <span className="input-icon">📍</span>
              <Input type="text" id="endereco" placeholder="Rua, Número, Bairro" value={formData.endereco} onChange={handleChange} />
            </div>
            {erros.endereco && <span className="field-error">{erros.endereco}</span>}
          </div>

          <div className="input-field-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <Input type="password" id="senha" placeholder="Crie uma senha segura" value={formData.senha} onChange={handleChange} />
            </div>
            {erros.senha && <span className="field-error">{erros.senha}</span>}
          </div>

          <Button type="submit" className="login-btn-gradient">
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