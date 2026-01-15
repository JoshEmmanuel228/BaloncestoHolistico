import React, { useState } from 'react';
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

  // Llamada a la API usando el SDK
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key no configurada. Por favor define VITE_GEMINI_API_KEY en las variables de entorno.');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      // Debug: Listar modelos disponibles si falla
      // genAI.listModels().then(response => console.log("Modelos disponibles:", response.models)).catch(console.error);

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
