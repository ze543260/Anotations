import express, { Router, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google-ai/generative-ai";

// Tipos personalizados
interface GenerateNotesRequest extends Request {
  body: {
    topic: string;
    level: "iniciante" | "intermediario" | "avancado";
  };
}

interface NotesResponse {
  success: boolean;
  data: {
    topic: string;
    level: string;
    notes: string;
    generatedAt: string;
  };
}

interface ErrorResponse {
  error: string;
  message: string;
}

type Level = "iniciante" | "intermediario" | "avancado";

const router: Router = express.Router();

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

router.post(
  "/generate-notes",
  async (
    req: GenerateNotesRequest,
    res: Response<NotesResponse | ErrorResponse>
  ) => {
    try {
      const { topic, level }: { topic: string; level: Level } = req.body;

      // Validação dos dados de entrada
      if (!topic || !level) {
        return res.status(400).json({
          error: "Dados inválidos",
          message: "Tópico e nível são obrigatórios",
        });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "Configuração inválida",
          message: "Chave da API Gemini não configurada",
        });
      }

      // Configurar o modelo
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Criar prompt personalizado baseado no nível
      const prompts: Record<Level, string> = {
        iniciante: `Crie anotações detalhadas e didáticas sobre "${topic}" para alguém que está começando a estudar este assunto. 
                  Use linguagem simples, explique conceitos básicos e inclua exemplos práticos.`,

        intermediario: `Crie anotações completas sobre "${topic}" para alguém com conhecimento intermediário. 
                      Inclua conceitos importantes, relações entre tópicos e casos de uso práticos.`,

        avancado: `Crie anotações avançadas e técnicas sobre "${topic}" para especialistas. 
                 Foque em detalhes complexos, casos extremos, otimizações e insights profundos.`,
      };

      const prompt: string = prompts[level] || prompts["intermediario"];

      // Gerar conteúdo com Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const notes: string = response.text();

      // Retornar resposta estruturada
      res.json({
        success: true,
        data: {
          topic,
          level,
          notes,
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (error: unknown) {
      console.error("Erro ao gerar anotações:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      // Tratamento específico de erros da API Gemini
      if (errorMessage.includes("API key")) {
        return res.status(401).json({
          error: "Erro de autenticação",
          message: "Chave da API Gemini inválida ou expirada",
        });
      }

      if (errorMessage.includes("quota")) {
        return res.status(429).json({
          error: "Limite excedido",
          message: "Limite de uso da API Gemini foi atingido",
        });
      }

      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Falha ao gerar anotações. Tente novamente.",
      });
    }
  }
);

export default router;
