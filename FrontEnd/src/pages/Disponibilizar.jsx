import React from 'react';
import './Disponibilizar.css';

export default function Disponibilizar() {
  return (
    <div className="disponibilizar-page">
      <div className="disponibilizar-container">
        
        <div className="disponibilizar-header">
          <h2>Anunciar seu Veículo</h2>
          <p>Preencha os dados do automóvel para começar a faturar com aluguéis</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="disponibilizar-form">
          
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="marca">Marca</label>
              <input type="text" id="marca" placeholder="Ex: Volkswagen, Chevrolet" className="form-input" />
            </div>

            <div className="form-field">
              <label htmlFor="modelo">Modelo</label>
              <input type="text" id="modelo" placeholder="Ex: Nivus, Onix" className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="ano">Ano do Veículo</label>
              <input type="number" id="ano" placeholder="Ex: 2023" className="form-input" />
            </div>

            <div className="form-field">
              <label htmlFor="preco">Preço da Diária (R$)</label>
              <input type="number" id="preco" placeholder="Ex: 150" className="form-input" />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="imagem">URL da Imagem do Carro</label>
            <input type="text" id="imagem" placeholder="https://linkdafoto.com/seu-carro.jpg" className="form-input" />
          </div>

          <div className="form-field">
            <label htmlFor="descricao">Descrição / Observações</label>
            <textarea id="descricao" rows="4" placeholder="Fale sobre os opcionais (ar-condicionado, teto solar) e regras do veículo..." className="form-textarea"></textarea>
          </div>

          <button type="button" className="btn-enviar-anuncio">
            🚀 Publicar Anúncio
          </button>
        </form>

      </div>
    </div>
  );
}