import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import CardCarro from '../components/CardCarro';
import carroBg from '../assets/car-login.png'; 
import { getAllCarros } from '../services/carroService';

export default function Home() {
  const [carros, setCarros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const res = await getAllCarros();
        // Pegar apenas os 3 carros mais recentes para os destaques
        const destaques = res.data.slice(-3).reverse();
        setCarros(destaques);
      } catch (err) {
        console.error("Erro ao buscar carros", err);
      }
    };
    fetchCarros();
  }, []);

  return (
    <div className="home-page">
      
      {/* SEÇÃO HERO */}
      <section className="home-hero" style={{ backgroundImage: `url(${carroBg})` }}>
        <div className="home-hero-overlay">
          <div className="hero-content">
            <h1>O carro ideal para a sua próxima jornada</h1>
            <p>Alugue veículos incríveis direto de proprietários locais com total segurança.</p>
            
            <div className="hero-actions">
              <button className="btn-hero-primary" onClick={() => navigate("/busca")}>
                🔍 Encontrar um Carro
              </button>
              <button className="btn-hero-secondary" onClick={() => navigate("/disponibilizar")}>
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
          <span onClick={() => navigate("/busca")} className="see-all-link" style={{cursor: 'pointer'}}>Ver todos →</span>
        </div>
        
        {carros.length === 0 ? (
          <p style={{textAlign: 'center', color: '#64748b'}}>Nenhum veículo cadastrado ainda.</p>
        ) : (
          <div className="featured-grid">
            {carros.map(carro => (
              <CardCarro key={carro.id} carro={carro} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}