# 🤖 API Gemini AI - Anotations Backend

Este documento descreve a implementação da API do Google Gemini AI no sistema Anotations.

## 🚀 Configuração do Gemini AI

### 📦 Dependências Instaladas

```json
{
  "@google/genai": "^0.4.0",
  "mime": "^4.0.1"
}
```

### 🔧 Configuração Avançada

O sistema utiliza configurações avançadas do Gemini AI:

- **Modelo**: `gemini-2.5-pro`
- **Safety Settings**: Configurado para permitir conteúdo educacional
- **System Instructions**: Prompt especializado para geração de anotações didáticas
- **Streaming**: Resposta em tempo real com chunks de conteúdo

## 📋 Estrutura da API

### Endpoint: `POST /api/generate-notes`

#### Request Body:

```typescript
{
  topic: string; // Tópico para gerar anotações
  level: "iniciante" | "intermediario" | "avancado";
}
```

#### Response Success (200):

```typescript
{
  success: true,
  data: {
    topic: string;
    level: string;
    notes: string;         // Anotações geradas pela IA
    generatedAt: string;   // ISO timestamp
  }
}
```

#### Response Error (400/500):

```typescript
{
  error: string;
  message: string;
}
```

## 🎯 Prompts Especializados

### Sistema de Instruções

O Gemini AI recebe instruções detalhadas para gerar anotações didáticas:

- **Objetivo**: Transformar qualquer assunto em anotações claras e organizadas
- **Estilo**: Linguagem simples, objetiva e amigável
- **Formato**: Estrutura em tópicos com marcadores e destaques
- **Adaptação**: Conteúdo ajustado por nível de conhecimento

### Níveis de Conhecimento

#### 🌟 Iniciante

- Explicações simples e exemplos cotidianos
- Vocabulário acessível
- Conceitos básicos bem explicados

#### 🎯 Intermediário

- Aprofundamento moderado
- Vocabulário técnico com explicações
- Relações entre conceitos

#### 🚀 Avançado

- Abordagem analítica
- Termos técnicos especializados
- Contextualização acadêmica

## 🔒 Configurações de Segurança

```typescript
safetySettings: [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  // ... outras configurações
];
```

**Justificativa**: Permite conteúdo educacional que pode conter temas sensíveis para fins didáticos.

## ⚡ Streaming de Conteúdo

A API utiliza `generateContentStream` para:

- **Resposta em tempo real**: Chunks de conteúdo conforme geração
- **Melhor experiência**: Reduz tempo de espera percebido
- **Eficiência**: Processa conteúdo longo de forma otimizada

```typescript
const response = await genAI.models.generateContentStream({
  model: "gemini-2.5-pro",
  config: modelConfig,
  contents,
});

let notes = "";
for await (const chunk of response) {
  if (chunk.text) {
    notes += chunk.text;
  }
}
```

## 🛡️ Tratamento de Erros

### Tipos de Erro Tratados:

1. **Validação**: Campos obrigatórios ausentes
2. **Autenticação**: API key inválida ou ausente
3. **Quota**: Limite de uso da API excedido
4. **Rede**: Falhas de conexão
5. **Genérico**: Outros erros não categorizados

### Códigos de Status:

- `200`: Sucesso na geração
- `400`: Dados de entrada inválidos
- `401`: Erro de autenticação (API key)
- `429`: Limite de quota excedido
- `500`: Erro interno do servidor

## 🧪 Testes

### Cobertura de Testes:

- ✅ Geração bem-sucedida de anotações
- ✅ Diferentes níveis de conhecimento
- ✅ Validação de campos obrigatórios
- ✅ Tratamento de API key ausente
- ✅ Validação de parâmetros
- ✅ Integração com streaming

### Executar Testes:

```bash
npm test                    # Todos os testes
npm test -- --coverage     # Com coverage
npm test generateNotes      # Testes específicos do Gemini
```

## 🚀 Exemplo de Uso

### Request:

```bash
curl -X POST http://localhost:4000/api/generate-notes \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "React Hooks",
    "level": "intermediario"
  }'
```

### Response:

```json
{
  "success": true,
  "data": {
    "topic": "React Hooks",
    "level": "intermediario",
    "notes": "# React Hooks\n\n## Conceitos Fundamentais\n\n### 1. **useState**\n- Gerencia estado local do componente\n- Retorna valor atual e função para atualizá-lo\n...",
    "generatedAt": "2024-12-15T10:30:00.000Z"
  }
}
```

## 📝 Formato de Saída

As anotações geradas seguem um padrão estruturado:

```markdown
# Título do Tópico

## 1. Introdução

- Contextualização do tema
- Importância e aplicações

## 2. Conceitos Principais

- **Termo Importante**: Explicação clara
- **Outro Conceito**: Definição didática

## 3. Exemplos Práticos

- Caso de uso 1
- Caso de uso 2

## 4. Conclusão

- Resumo dos pontos principais
- Próximos passos sugeridos
```

## 🔧 Manutenção

### Monitoramento:

- Logs de erros da API Gemini
- Tempo de resposta do streaming
- Taxa de sucesso das requisições

### Otimizações:

- Cache de respostas frequentes
- Limitação de rate limiting
- Compressão de conteúdo

---

**Implementação**: Dezembro 2024  
**Modelo**: Gemini 2.5 Pro  
**Status**: ✅ Funcional com Streaming
