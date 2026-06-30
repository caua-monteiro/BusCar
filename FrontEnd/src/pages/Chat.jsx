import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import api from "../services/api";

export default function Chat() {
  const [conversas, setConversas] = useState([]);
  const [conversaAtiva, setConversaAtiva] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const ws = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchConversas();
  }, []);

  const fetchConversas = async () => {
    try {
      const res = await api.get("/conversas");
      setConversas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selecionarConversa = async (conversaId) => {
    setConversaAtiva(conversaId);
    try {
      const res = await api.get(`/conversas/${conversaId}/mensagens`);
      setMensagens(res.data);
      conectarWebSocket(conversaId);
    } catch (err) {
      console.error(err);
    }
  };

  const conectarWebSocket = (conversaId) => {
    if (ws.current) {
      ws.current.close();
    }
    const token = localStorage.getItem("token");
    ws.current = new WebSocket(`ws://localhost:3000/chat?token=${token}&conversaId=${conversaId}`);

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMensagens((prev) => [...prev, msg]);
    };
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !conversaAtiva) return;

    try {
      await api.post(`/conversas/${conversaAtiva}/mensagens`, { texto: novaMensagem });
      setNovaMensagem("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <h3>Minhas Conversas</h3>
        {conversas.length === 0 && <p className="no-chats">Nenhuma conversa ainda.</p>}
        {conversas.map((c) => {
          // Identificar com quem estou falando
          const outroUsuario = c.locatario.id === user.id ? c.carro.proprietario : c.locatario;
          return (
            <div 
              key={c.id} 
              className={`chat-item ${conversaAtiva === c.id ? "active" : ""}`}
              onClick={() => selecionarConversa(c.id)}
            >
              <div className="chat-avatar">{outroUsuario.nome.charAt(0).toUpperCase()}</div>
              <div className="chat-info">
                <h4>{outroUsuario.nome}</h4>
                <p>{c.carro.marca} {c.carro.modelo}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-main">
        {conversaAtiva ? (
          <>
            <div className="chat-messages">
              {mensagens.map((m, index) => {
                const isMe = m.remetente.id === user.id;
                return (
                  <div key={index} className={`message ${isMe ? "sent" : "received"}`}>
                    <div className="message-bubble">{m.texto}</div>
                  </div>
                );
              })}
            </div>
            <form className="chat-input-area" onSubmit={enviarMensagem}>
              <input 
                type="text" 
                placeholder="Digite uma mensagem..." 
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
              />
              <button type="submit">Enviar</button>
            </form>
          </>
        ) : (
          <div className="chat-placeholder">
            <p>Selecione uma conversa ao lado para começar a falar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
