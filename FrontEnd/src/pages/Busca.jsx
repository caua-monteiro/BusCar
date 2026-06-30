import React, { useState, useEffect } from 'react';
import './Busca.css';
import CardCarro from '../components/CardCarro';
import { getAllCarros } from '../services/carroService';

export default function Busca() {
  const [termoBusca, setTermoBusca] = useState('');
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const res = await getAllCarros();
        setCarros(res.data);
      } catch (err) {
        console.error("Erro ao buscar carros", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarros();
  }, []);

  // Lógica de filtragem reativa baseada no input digitado
  const carrosFiltrados = carros.filter(carro => {
    const termo = termoBusca.toLowerCase();
    const modelo = carro.modelo ? carro.modelo.toLowerCase() : '';
    const marca = carro.marca ? carro.marca.toLowerCase() : '';
    return modelo.includes(termo) || marca.includes(termo);
  });

  return (
    <div className="busca-page">
      <div className="busca-container">
        
        {/* CABEÇALHO E BARRA DE PESQUISA */}
        <div className="busca-header">
          <h2>Veículos Disponíveis</h2>
          <p>Encontre e reserve o automóvel ideal diretamente com moradores locais</p>
          
          <div className="search-bar-wrapper">
            <input 
              type="text" 
              placeholder="Digite a marca ou o modelo do carro (ex: BMW, Onix...)"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* LISTAGEM DE RESULTADOS */}
        {loading ? (
          <p style={{textAlign: 'center', marginTop: '50px'}}>Buscando veículos disponíveis...</p>
        ) : carrosFiltrados.length > 0 ? (
          <div className="grid-resultados">
            {carrosFiltrados.map(carro => (
              <div key={carro.id}>
                <CardCarro carro={carro} />
              </div>
            ))}
          </div>
        ) : (
          <div className="busca-vazia">
            <span className="vazia-icon">🚗❓</span>
            <h4>Nenhum veículo encontrado</h4>
            <p>Tente buscar por termos diferentes ou confira a ortografia.</p>
          </div>
        )}

      </div>
    </div>
  );
}