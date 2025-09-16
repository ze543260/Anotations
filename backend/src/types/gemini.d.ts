// Tipos personalizados para Google Gemini AI
declare module "@google/genai" {
  export interface GoogleGenAIConfig {
    apiKey: string;
  }

  export class GoogleGenAI {
    constructor(config: GoogleGenAIConfig);
    models: {
      generateContentStream(
        params: GenerateContentStreamParams
      ): AsyncIterable<GenerateContentChunk>;
    };
  }

  export interface GenerateContentStreamParams {
    model: string;
    config: ModelConfig;
    contents: Content[];
  }

  export interface ModelConfig {
    thinkingConfig?: {
      thinkingBudget: number;
    };
    safetySettings?: SafetySetting[];
    systemInstruction?: SystemInstruction[];
  }

  export interface SafetySetting {
    category: HarmCategory;
    threshold: HarmBlockThreshold;
  }

  export interface SystemInstruction {
    text: string;
  }

  export interface Content {
    role: "user" | "model";
    parts: Part[];
  }

  export interface Part {
    text: string;
  }

  export interface GenerateContentChunk {
    text?: string;
  }

  export enum HarmCategory {
    HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT",
    HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH",
    HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT",
  }

  export enum HarmBlockThreshold {
    BLOCK_NONE = "BLOCK_NONE",
    BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
    BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
    BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
  }
}
