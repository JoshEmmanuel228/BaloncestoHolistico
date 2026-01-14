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
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=AIzaSyDaE3RCJgWHzolrdLOGEzXOcCw9rR09GNQ',
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
      const data = await response.json();
      let aiText = '';
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiText = data.candidates[0].content.parts[0].text;
      } else {
        aiText = 'No se recibió respuesta de la IA.\n\nRespuesta completa de la API:\n' + JSON.stringify(data, null, 2);
      }
      setMessages(msgs => [...msgs, { from: 'bot', text: aiText }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Error al conectar con la IA.' }]);
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
