import React, { useState } from 'react';
// Aquí deberías importar tu API de Gemini o el hook que la conecta
// import { useGeminiAPI } from '../api/gemini';

const FuturisticAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy tu Asistente Deportivo IA. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Llamada real a la API de Gemini
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key no configurada. Por favor define VITE_GEMINI_API_KEY en las variables de entorno.');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              { parts: [{ text: input }] }
            ]
          })
        }
      );

      if (!response.ok) {
        if (response.status === 429) throw new Error('Cuota excedida (Error 429).');
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      let aiText = '';
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiText = data.candidates[0].content.parts[0].text;
      } else {
        aiText = 'No se recibió respuesta de la IA.';
      }
      setMessages(msgs => [...msgs, { from: 'bot', text: aiText }]);
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
