const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const generateNotesRoute = require('./routes/generateNotes');

// Configurar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', generateNotesRoute);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Anotations API is running!',
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo deu errado!',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe nesta API`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API de Anotações disponível em http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});
