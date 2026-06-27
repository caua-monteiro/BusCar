import React from 'react';
import './Configuracoes.css';

export default function Configuracoes() {
  return (
    <div className="config-page">
      <div className="config-container">
        
        <div className="config-header">
          <h2>Minha Conta</h2>
          <p>Gerencie suas informações pessoais e configurações da plataforma</p>
        </div>

        <div className="config-layout">
          {/* MENU LATERAL SIMPLES */}
          <aside className="config-sidebar">
            <button className="sidebar-btn active">👤 Editar Perfil</button>
            <button className="sidebar-btn" onClick={() => window.location.href = "/"}>🚗 Meus Aluguéis</button>
            <button className="sidebar-btn logout" onClick={() => window.location.href = "/"}>🚪 Sair da Conta</button>
          </aside>

          {/* FORMULÁRIO DE EDIÇÃO */}
          <main className="config-content">
            <form onSubmit={(e) => e.preventDefault()} className="config-form">
              <h3>Informações Pessoais</h3>
              
              <div className="form-field">
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" placeholder="Seu nome" className="form-input" />
              </div>

              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="seuemail@provedor.com" className="form-input" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="telefone">Telefone</label>
                  <input type="tel" id="telefone" placeholder="(42) 99999-9999" className="form-input" />
                </div>

                <div className="form-field">
                  <label htmlFor="endereco">Endereço</label>
                  <input type="text" id="endereco" placeholder="Cidade - PR" className="form-input" />
                </div>
              </div>

              <button type="button" className="btn-salvar-config">
                💾 Salvar Alterações
              </button>
            </form>
          </main>
        </div>

      </div>
    </div>
  );
}