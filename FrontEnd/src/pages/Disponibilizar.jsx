import React, { useState } from 'react';
import './Disponibilizar.css';
import { createCarro } from '../services/carroService';
import { useNavigate } from 'react-router-dom';

export default function Disponibilizar() {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    precoDia: '',
    cidade: '',
    descricao: ''
  });
  const [imagemFile, setImagemFile] = useState(null);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErros({ ...erros, [e.target.id]: '' });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagemFile(e.target.files[0]);
    }
  };

  const validarCampos = () => {
    let novosErros = {};
    const anoAtual = new Date().getFullYear();

    if (!formData.marca || formData.marca.trim().length < 2) novosErros.marca = 'A marca deve ter pelo menos 2 caracteres.';
    if (!formData.modelo || formData.modelo.trim().length < 2) novosErros.modelo = 'O modelo deve ter pelo menos 2 caracteres.';
    if (!formData.cidade || formData.cidade.trim().length < 2) novosErros.cidade = 'Informe a cidade de retirada.';
    
    if (!formData.ano || isNaN(formData.ano) || formData.ano < 1900 || formData.ano > anoAtual + 1) {
      novosErros.ano = `O ano deve ser entre 1900 e ${anoAtual + 1}.`;
    }
    
    if (!formData.precoDia || isNaN(formData.precoDia) || formData.precoDia <= 0) {
      novosErros.precoDia = 'O preço deve ser maior que 0.';
    }

    if (!formData.descricao || formData.descricao.trim().length < 10) {
      novosErros.descricao = 'Forneça uma descrição mais detalhada (mín. 10 caracteres).';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setErroGeral('');
    
    if (!validarCampos()) return;

    try {
      // Usando FormData para enviar texto e arquivo simultaneamente
      const data = new FormData();
      data.append('marca', formData.marca);
      data.append('modelo', formData.modelo);
      data.append('ano', formData.ano);
      data.append('precoDia', formData.precoDia);
      data.append('cidade', formData.cidade);
      data.append('descricao', formData.descricao);
      
      if (imagemFile) {
        data.append('imagem', imagemFile);
      }

      await createCarro(data);
      alert('Anúncio publicado com sucesso!');
      navigate('/meusanuncios');
    } catch (err) {
      setErroGeral(err.response?.data?.error || 'Erro ao publicar veículo. Verifique se sua CNH está cadastrada.');
    }
  };

  return (
    <div className="disponibilizar-page">
      <div className="disponibilizar-container">
        
        <div className="disponibilizar-header">
          <h2>Anunciar seu Veículo</h2>
          <p>Preencha os dados do automóvel para começar a faturar com aluguéis</p>
        </div>

        {erroGeral && <p style={{ color: "red", textAlign: "center", background: "#fee", padding: "10px", borderRadius: "8px" }}>{erroGeral}</p>}

        <form onSubmit={handlePublish} className="disponibilizar-form" encType="multipart/form-data">
          
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="marca">Marca</label>
              <input type="text" id="marca" placeholder="Ex: Volkswagen, Chevrolet" className="form-input" value={formData.marca} onChange={handleChange} />
              {erros.marca && <span className="field-error">{erros.marca}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="modelo">Modelo</label>
              <input type="text" id="modelo" placeholder="Ex: Nivus, Onix" className="form-input" value={formData.modelo} onChange={handleChange} />
              {erros.modelo && <span className="field-error">{erros.modelo}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="ano">Ano do Veículo</label>
              <input type="number" id="ano" placeholder="Ex: 2023" className="form-input" value={formData.ano} onChange={handleChange} />
              {erros.ano && <span className="field-error">{erros.ano}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="precoDia">Preço da Diária (R$)</label>
              <input type="number" id="precoDia" placeholder="Ex: 150" className="form-input" value={formData.precoDia} onChange={handleChange} />
              {erros.precoDia && <span className="field-error">{erros.precoDia}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="cidade">Cidade de Retirada</label>
            <input type="text" id="cidade" placeholder="Ex: São Paulo, SP" className="form-input" value={formData.cidade} onChange={handleChange} />
            {erros.cidade && <span className="field-error">{erros.cidade}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="imagem">Foto do Veículo (Opcional)</label>
            <input type="file" id="imagem" accept="image/*" className="form-input" style={{ padding: '8px' }} onChange={handleFileChange} />
          </div>

          <div className="form-field">
            <label htmlFor="descricao">Descrição / Observações</label>
            <textarea id="descricao" rows="4" placeholder="Fale sobre os opcionais (ar-condicionado, teto solar) e regras do veículo..." className="form-textarea" value={formData.descricao} onChange={handleChange} ></textarea>
            {erros.descricao && <span className="field-error">{erros.descricao}</span>}
          </div>

          <button type="submit" className="btn-enviar-anuncio">
            🚀 Publicar Anúncio
          </button>
        </form>
      </div>
    </div>
  );
}