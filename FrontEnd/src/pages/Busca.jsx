import React, { useState } from 'react';
import './Busca.css';
import CardCarro from '../components/CardCarro';

// Mock mais robusto de veículos para simular a resposta da listagem da API do Backend
const BANCO_DE_CARROS_MOCK = [
  { id: 1, marca: 'BMW', modelo: 'Série 8 Coupe', ano: 2023, precoDiaria: 450, avaliacao: 5.0, prestador: 'Carlos S.', imagem: '' },
  { id: 2, marca: 'Chevrolet', modelo: 'Onix Turbo', ano: 2022, precoDiaria: 120, avaliacao: 4.5, prestador: 'Ana J.', imagem: '' },
  { id: 3, marca: 'Volkswagen', modelo: 'Nivus Highline', ano: 2023, precoDiaria: 190, avaliacao: 4.8, prestador: 'Marcos V.', imagem: '' },
  { id: 4, marca: 'Hyundai', modelo: 'HB20 Nova Geração', ano: 2021, precoDiaria: 105, avaliacao: 4.2, prestador: 'Roberto F.', imagem: '' }
];

export default function Busca() {
  const [termoBusca, setTermoBusca] = useState('');

  // Lógica de filtragem reativa baseada no input digitado
  const carrosFiltrados = BANCO_DE_CARROS_MOCK.filter(carro => 
    carro.modelo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    carro.marca.toLowerCase().includes(termoBusca.toLowerCase())
  );

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
        {carrosFiltrados.length > 0 ? (
          <div className="grid-resultados">
            {carrosFiltrados.map(carro => (
              // Interceptamos o clique do botão do card redirecionando nativamente para a rota do carro
              <div key={carro.id} onClick={() => window.location.href = `/carro`}>
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