import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Carro.css';
import { getCarroById } from '../services/carroService';

export default function Carro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carro, setCarro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchCarro = async () => {
      try {
        const res = await getCarroById(id);
        setCarro(res.data);
      } catch (err) {
        setErro('Veículo não encontrado ou erro no servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchCarro();
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/600x400?text=Sem+Foto";
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}/${url}`;
  };

  const handleChat = () => {
    // Para simplificar no fluxo atual, apenas redireciona para a aba geral de chat
    navigate('/chat');
  };

  const handleAlugar = () => {
    alert("Funcionalidade de Aluguel será implementada em breve!");
  };

  if (loading) return <div className="carro-detalhes-page"><p style={{textAlign: 'center'}}>Carregando detalhes...</p></div>;
  if (erro) return <div className="carro-detalhes-page"><p className="error-message">{erro}</p></div>;
  if (!carro) return null;

  return (
    <div className="carro-detalhes-page">
      <div className="carro-detalhes-container">
        <div className="carro-imagem-wrapper">
          <img src={getImageUrl(carro.imagem)} alt={`${carro.marca} ${carro.modelo}`} />
        </div>
        <div className="carro-info-wrapper">
          <div className="carro-header">
            <h2>{carro.marca} {carro.modelo}</h2>
            <p>Ano: {carro.ano}</p>
            <div className="carro-price">R$ {Number(carro.precoDia).toFixed(2)} / dia</div>
          </div>

          <div className="carro-description">
            <h3>Descrição do Veículo</h3>
            <p>{carro.descricao || "Nenhuma descrição fornecida pelo proprietário."}</p>
          </div>

          <div className="carro-actions">
            <button className="btn-chat" onClick={handleChat}>💬 Falar com o Dono</button>
            <button className="btn-alugar" onClick={handleAlugar}>🚗 Solicitar Aluguel</button>
          </div>
        </div>
      </div>
    </div>
  );
}