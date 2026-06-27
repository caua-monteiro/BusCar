import React from 'react';
import './Home.css';

// Importando componentes conforme sua árvore de arquivos
import CardCarro from '../components/CardCarro';
import carroBg from '../assets/car-login.png'; 

// Mock temporário que será facilmente substituído pela requisição do seu Backend (API)
const CARROS_DESTAQUE_MOCK = [
  { id: 1, marca: 'BMW', modelo: 'Série 8 Coupe', ano: 2023, precoDiaria: 450, avaliacao: 4.9, prestador: 'Carlos S.' },
  { id: 3, marca: 'Volkswagen', modelo: 'Nivus Highline', ano: 2023, precoDiaria: 190, avaliacao: 4.8, prestador: 'Marcos V.' }
];

export default function Home() {
  return (
    <div className="home-page">
      
      {/* SEÇÃO HERO */}
      <section className="home-hero" style={{ backgroundImage: `url(${carroBg})` }}>
        <div className="home-hero-overlay">
          <div className="hero-content">
            <h1>O carro ideal para a sua próxima jornada</h1>
            <p>Alugue veículos incríveis direto de proprietários locais com total segurança.</p>
            
            <div className="hero-actions">
              <button className="btn-hero-primary" onClick={() => window.location.href = "/busca"}>
                🔍 Encontrar um Carro
              </button>
              <button className="btn-hero-secondary" onClick={() => window.location.href = "/disponibilizar"}>
                🔑 Anunciar meu Veículo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DIFERENCIAIS */}
      <section className="home-features">
        <h3>Por que escolher o BusCar?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h4>Segurança Total</h4>
            <p>Perfis verificados e histórico de avaliações transparente.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h4>Preço Justo</h4>
            <p>Negocie diretamente com o dono do carro, sem taxas abusivas.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CARROS EM DESTAQUE */}
      <section className="home-featured-cars">
        <div className="section-title-wrapper">
          <h3>Veículos em Destaque</h3>
          <a href="/busca" className="see-all-link">Ver todos →</a>
        </div>
        
        <div className="featured-grid">
          {CARROS_DESTAQUE_MOCK.map(carro => (
            <CardCarro key={carro.id} carro={carro} />
          ))}
        </div>
      </section>

    </div>
  );
}