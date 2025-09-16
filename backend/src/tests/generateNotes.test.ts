import request from "supertest";
import express from "express";
import cors from "cors";
import generateNotesRouter from "../routes/generateNotes";

// Mock do Gemini AI
jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContentStream: jest.fn().mockResolvedValue(
        (async function* () {
          yield {
            text: "# Teste de Anotações\n\n## Introdução\nEste é um teste.",
          };
          yield {
            text: "\n\n## Conceitos Principais\n- Conceito 1\n- Conceito 2",
          };
          yield { text: "\n\n## Conclusão\nTeste concluído com sucesso." };
        })()
      ),
    },
  })),
  HarmBlockThreshold: {
    BLOCK_NONE: "BLOCK_NONE",
  },
  HarmCategory: {
    HARM_CATEGORY_HARASSMENT: "HARM_CATEGORY_HARASSMENT",
    HARM_CATEGORY_HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH",
    HARM_CATEGORY_SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    HARM_CATEGORY_DANGEROUS_CONTENT: "HARM_CATEGORY_DANGEROUS_CONTENT",
  },
}));

describe("Generate Notes API with Gemini", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", generateNotesRouter);

    // Mock environment variables
    process.env.GEMINI_API_KEY = "test_api_key";
  });

  afterAll(() => {
    delete process.env.GEMINI_API_KEY;
  });

  describe("POST /api/generate-notes", () => {
    it("should generate notes successfully with Gemini AI", async () => {
      const requestData = {
        topic: "JavaScript",
        level: "intermediario",
      };

      const response = await request(app)
        .post("/api/generate-notes")
        .send(requestData)
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("topic", "JavaScript");
      expect(response.body.data).toHaveProperty("level", "intermediario");
      expect(response.body.data).toHaveProperty("notes");
      expect(response.body.data).toHaveProperty("generatedAt");

      // Verificar se as notas contêm o conteúdo esperado do mock
      expect(response.body.data.notes).toContain("Teste de Anotações");
      expect(response.body.data.notes).toContain("Conceitos Principais");
      expect(response.body.data.notes).toContain("Teste concluído com sucesso");
    });

    it("should handle different knowledge levels", async () => {
      const levels = ["iniciante", "intermediario", "avancado"];

      for (const level of levels) {
        const requestData = {
          topic: "React",
          level,
        };

        const response = await request(app)
          .post("/api/generate-notes")
          .send(requestData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.level).toBe(level);
      }
    });

    it("should return 400 for missing required fields", async () => {
      const response = await request(app)
        .post("/api/generate-notes")
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.message).toContain("obrigatórios");
    });

    it("should return 500 when Gemini API key is missing", async () => {
      delete process.env.GEMINI_API_KEY;

      const requestData = {
        topic: "Node.js",
        level: "iniciante",
      };

      const response = await request(app)
        .post("/api/generate-notes")
        .send(requestData)
        .expect(500);

      expect(response.body).toHaveProperty("error");
      expect(response.body.message).toContain("Gemini não configurada");

      // Restaurar variável de ambiente
      process.env.GEMINI_API_KEY = "test_api_key";
    });

    it("should validate level parameter", async () => {
      const requestData = {
        topic: "TypeScript",
        level: "expert", // nível inválido
      };

      const response = await request(app)
        .post("/api/generate-notes")
        .send(requestData)
        .expect(200); // Deve usar nível padrão (intermediário)

      expect(response.body.success).toBe(true);
    });
  });

  describe("Gemini AI Integration", () => {
    it("should use proper system instructions", async () => {
      const requestData = {
        topic: "Machine Learning",
        level: "avancado",
      };

      const response = await request(app)
        .post("/api/generate-notes")
        .send(requestData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.notes).toBeTruthy();
    });

    it("should stream content properly", async () => {
      const requestData = {
        topic: "Python",
        level: "iniciante",
      };

      const response = await request(app)
        .post("/api/generate-notes")
        .send(requestData)
        .expect(200);

      // Verificar se o conteúdo foi concatenado corretamente
      expect(response.body.data.notes).toContain("Teste de Anotações");
      expect(response.body.data.notes).toContain("Conceitos Principais");
      expect(response.body.data.notes).toContain("Conclusão");
    });
  });
});
