import React from 'react';
import './CardCarro.css'; // Vamos criar esse arquivo de estilos logo abaixo

export default function CardCarro({ carro }) {
  const { modelo, marca, ano, precoDiaria, avaliacao, imagem, prestador } = carro;

  // Função simples para gerar as estrelas visualmente
  const renderEstrelas = (nota) => {
    return '⭐'.repeat(Math.round(nota));
  };

  return (
    <div className="carro-card">
      <div className="carro-card-image-wrapper">
        <img src={imagem || 'https://via.placeholder.com/300x180?text=Sem+Foto'} alt={`${marca} ${modelo}`} />
        <span className="carro-card-price">R$ {precoDiaria}/dia</span>
      </div>

      <div className="carro-card-content">
        <div className="carro-card-header">
          <h4>{marca} {modelo}</h4>
          <span className="carro-card-ano">{ano}</span>
        </div>

        <p className="carro-card-owner">Anfitrião: {prestador}</p>

        <div className="carro-card-footer">
          <div className="carro-card-stars">
            {renderEstrelas(avaliacao)}
            <span className="carro-card-nota">({avaliacao.toFixed(1)})</span>
          </div>
          
          <button className="carro-card-btn">Ver Detalhes</button>
        </div>
      </div>
    </div>
  );
}