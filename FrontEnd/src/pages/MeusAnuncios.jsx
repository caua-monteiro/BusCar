import React, { useEffect, useState } from 'react';
import './MeusAnuncios.css';
import { getMeusCarros, deleteCarro } from '../services/carroService';

export default function MeusAnuncios() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarros();
  }, []);

  const fetchCarros = async () => {
    try {
      const res = await getMeusCarros();
      setCarros(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente remover este anúncio?")) {
      try {
        await deleteCarro(id);
        setCarros(carros.filter(c => c.id !== id));
      } catch (err) {
        alert("Erro ao remover veículo.");
      }
    }
  };

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300x200?text=Sem+Foto";
    // Se já for uma URL externa (http:// ou https://) apenas retorna
    if (url.startsWith('http')) return url;
    // Se for do nosso servidor local, adiciona o host da API
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}/${url}`;
  };

  return (
    <div className="meusanuncios-page">
      <div className="meusanuncios-container">
        <h2 className="title-gradient">Meus Anúncios</h2>
        <p>Gerencie os veículos que você disponibilizou para aluguel.</p>

        {loading ? (
          <p>Carregando...</p>
        ) : carros.length === 0 ? (
          <div className="no-cars-card">
            <h3>Você ainda não possui anúncios.</h3>
            <p>Vá até a aba "Anunciar" para publicar seu primeiro veículo!</p>
          </div>
        ) : (
          <div className="cars-grid">
            {carros.map((carro) => (
              <div key={carro.id} className="car-card">
                <img src={getImageUrl(carro.imagem)} alt={carro.modelo} className="car-image" />
                <div className="car-info">
                  <h3>{carro.marca} {carro.modelo} ({carro.ano})</h3>
                  <p className="car-price">R$ {Number(carro.precoDia).toFixed(2)} / dia</p>
                  <button onClick={() => handleDelete(carro.id)} className="btn-danger">
                    Excluir Anúncio
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
