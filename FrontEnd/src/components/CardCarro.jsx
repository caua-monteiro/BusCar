import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardCarro.css'; // Vamos criar esse arquivo de estilos logo abaixo

export default function CardCarro({ carro }) {
  const { id, modelo, marca, ano, precoDiaria, avaliacao, imagem, prestador } = carro;
  const navigate = useNavigate();

  // Função simples para gerar as estrelas visualmente
  const renderEstrelas = (nota) => {
    if (!nota) return '⭐⭐⭐⭐⭐'; // mock fallback
    return '⭐'.repeat(Math.round(nota));
  };

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300x180?text=Sem+Foto";
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}/${url}`;
  };

  const precoFormatado = precoDiaria !== undefined ? Number(precoDiaria).toFixed(2) : carro.precoDia ? Number(carro.precoDia).toFixed(2) : "0.00";

  return (
    <div className="carro-card">
      <div className="carro-card-image-wrapper">
        <img src={getImageUrl(imagem)} alt={`${marca} ${modelo}`} />
        <span className="carro-card-price">R$ {precoFormatado}/dia</span>
      </div>

      <div className="carro-card-content">
        <div className="carro-card-header">
          <h4>{marca} {modelo}</h4>
          <span className="carro-card-ano">{ano}</span>
        </div>

        <p className="carro-card-owner">Anfitrião: {prestador || 'Proprietário Verificado'}</p>

        <div className="carro-card-footer">
          <div className="carro-card-stars">
            {renderEstrelas(avaliacao || 5)}
            <span className="carro-card-nota">({(avaliacao || 5).toFixed(1)})</span>
          </div>
          
          <button className="carro-card-btn" onClick={() => navigate(`/carro/${id}`)}>Ver Detalhes</button>
        </div>
      </div>
    </div>
  );
}