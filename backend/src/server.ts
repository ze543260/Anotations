import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateNotesRoute from "./routes/generateNotes";

// Configurar variáveis de ambiente
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "4000", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", generateNotesRoute);

// Rota de teste
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Anotations API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Algo deu errado!",
    message: err.message,
  });
});

// Middleware para rotas não encontradas
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Rota não encontrada",
    message: `A rota ${req.originalUrl} não existe nesta API`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API de Anotações disponível em http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});

export default app;
