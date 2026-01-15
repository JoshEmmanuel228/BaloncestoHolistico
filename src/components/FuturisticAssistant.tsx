import React, { useState, useEffect } from 'react';
// Aquí deberías importar tu API de Gemini o el hook que la conecta
// import { useGeminiAPI } from '../api/gemini';


// Importar GoogleGenerativeAI
import { GoogleGenerativeAI } from '@google/generative-ai';

const FuturisticAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy tu Asistente Deportivo IA. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Debug: Listar modelos al montar
  useEffect(() => {
    const listModels = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) return;
        console.log("Consultando modelos disponibles...");
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        console.log("=== MODELOS DISPONIBLES ===", data);
      } catch (e) {
        console.error("Error listando modelos:", e);
      }
    };
    listModels();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key no configurada.');
      }

      const genAI = new GoogleGenerativeAI(apiKey);

      // INTENTO DE DEBUG: Listar modelos antes de fallar
      // Esto nos dirá qué modelos SÍ están disponibles para tu API Key
      try {
        // Note: listModels might not be exposed on the helper class in older versions, 
        // but let's try the fetch equivalent if needed or assume standard SDK usage.
        // Actually the standard is not to list models from the client instance easily in web?
        // Let's trust the previous error message suggestion: "Call ListModels". 
        // It implies it is possible.
      } catch (e) { }

      // Vamos a probar con 'gemini-pro' de nuevo pero imprimiendo info
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(input);

      const response = await result.response;
      const text = response.text();

      setMessages(msgs => [...msgs, { from: 'bot', text: text }]);
    } catch (err: any) {
      console.error(err);
      setMessages(msgs => [...msgs, { from: 'bot', text: `Error: ${err.message || 'Error al conectar con la IA.'}` }]);
    }
    setLoading(false);
    setInput('');
  };

  return (
    <div className="futuristic-chat">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`msg ${msg.from}`}>{msg.text}</div>
        ))}
        {loading && <div className="msg bot loading">Pensando...</div>}
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu pregunta o pide un entrenamiento..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>Enviar</button>
      </div>
    </div>
  );
};

export default FuturisticAssistant;
