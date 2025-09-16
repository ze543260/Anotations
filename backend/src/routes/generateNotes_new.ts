import express, { Router, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  ): Promise<void> => {
    try {
      const { topic, level }: { topic: string; level: Level } = req.body;

      // Validação dos dados de entrada
      if (!topic || !level) {
        res.status(400).json({
          error: "Dados inválidos",
          message: "Tópico e nível são obrigatórios",
        });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          error: "Configuração inválida",
          message: "Chave da API Gemini não configurada",
        });
        return;
      }

      // Configurar o modelo
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        systemInstruction: `Você é um assistente educacional especializado em transformar qualquer assunto em anotações didáticas claras, organizadas e acessíveis para estudantes de todos os níveis.

🎯 Objetivo:
- Gerar anotações didáticas sobre qualquer tema solicitado
- Adaptar o conteúdo ao nível de conhecimento indicado
- Facilitar a escrita manual e o estudo individual

📐 Formato:
- Título do tópico em destaque
- Estrutura em tópicos e subtópicos com marcadores
- Destaques em **negrito** para termos importantes
- Separação clara entre seções

🎓 Adaptação por nível:
- **Iniciante**: explicações simples, exemplos cotidianos
- **Intermediário**: vocabulário técnico com explicações
- **Avançado**: abordagem analítica e termos especializados`,
      });

      // Criar prompt personalizado baseado no nível
      const levelInstructions: Record<Level, string> = {
        iniciante:
          "Nível INICIANTE: Use explicações simples, exemplos cotidianos e vocabulário acessível.",
        intermediario:
          "Nível INTERMEDIÁRIO: Faça aprofundamento moderado com vocabulário técnico explicado.",
        avancado:
          "Nível AVANÇADO: Use abordagem analítica, termos técnicos e contextualização acadêmica.",
      };

      const instruction =
        levelInstructions[level] || levelInstructions["intermediario"];
      const prompt = `${instruction}\n\nTópico: ${topic}\n\nGere anotações didáticas completas sobre este tópico seguindo as diretrizes do sistema.`;

      // Gerar conteúdo com Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const notes = response.text();

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
      if (errorMessage.includes("API_KEY")) {
        res.status(401).json({
          error: "Erro de autenticação",
          message: "Chave da API Gemini inválida ou expirada",
        });
        return;
      }

      if (errorMessage.includes("quota") || errorMessage.includes("QUOTA")) {
        res.status(429).json({
          error: "Limite excedido",
          message: "Limite de uso da API Gemini foi atingido",
        });
        return;
      }

      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Falha ao gerar anotações. Tente novamente.",
      });
    }
  }
);

export default router;
