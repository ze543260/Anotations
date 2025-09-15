import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:4000/api';

function App() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('intermediario');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateNotes = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Por favor, digite um tópico');
      return;
    }

    setLoading(true);
    setError('');
    setNotes('');

    try {
      const response = await axios.post(`${API_BASE_URL}/generate-notes`, {
        topic: topic.trim(),
        level
      });

      if (response.data.success) {
        setNotes(response.data.data.notes);
      } else {
        setError('Erro ao gerar anotações');
      }
    } catch (err) {
      console.error('Erro:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === 'ECONNREFUSED') {
        setError('Não foi possível conectar com o servidor. Verifique se o backend está rodando.');
      } else {
        setError('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearNotes = () => {
    setNotes('');
    setError('');
  };

  const handleCopyNotes = () => {
    if (notes) {
      navigator.clipboard.writeText(notes);
      // Feedback visual simples
      const button = document.getElementById('copy-btn');
      const originalText = button.textContent;
      button.textContent = 'Copiado!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🤖 Anotations</h1>
        <p>Gerador de anotações inteligentes usando IA</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleGenerateNotes} className="notes-form">
          <div className="form-group">
            <label htmlFor="topic">
              📝 Tópico para estudar:
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: JavaScript, React, Node.js..."
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">
              🎯 Nível de conhecimento:
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              disabled={loading}
            >
              <option value="iniciante">🟢 Iniciante</option>
              <option value="intermediario">🟡 Intermediário</option>
              <option value="avancado">🔴 Avançado</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading || !topic.trim()}
            className="generate-btn"
          >
            {loading ? '⏳ Gerando...' : '🚀 Gerar Anotações'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {notes && (
          <div className="notes-result">
            <div className="notes-header">
              <h3>📚 Suas anotações sobre: {topic}</h3>
              <div className="notes-actions">
                <button 
                  id="copy-btn"
                  onClick={handleCopyNotes}
                  className="action-btn copy-btn"
                  title="Copiar anotações"
                >
                  📋 Copiar
                </button>
                <button 
                  onClick={handleClearNotes}
                  className="action-btn clear-btn"
                  title="Limpar anotações"
                >
                  🗑️ Limpar
                </button>
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="notes-textarea"
              placeholder="Suas anotações aparecerão aqui..."
              rows={15}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Desenvolvido com ❤️ usando React + Electron + Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;
