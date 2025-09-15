# GitHub Copilot Instructions - Anotations Project

Este projeto é uma aplicação multi-plataforma para geração de anotações usando IA, com backend em Node.js e frontends para desktop (React/Electron) e mobile (React Native/Expo).

## Arquitetura do Projeto

O projeto segue uma arquitetura monorepo com três módulos principais:

```
/
├── backend/           # API Node.js + Express
├── desktop/          # Aplicação React + Electron
├── mobile/           # Aplicação React Native + Expo
├── .github/          # GitHub Actions workflows
├── .gitignore
└── README.md
```

## Diretrizes de Desenvolvimento

### Estrutura de Código

#### Backend (Node.js + Express)

- **Localização**: `backend/`
- **Stack**: Node.js, Express, Gemini AI API
- **Estrutura**:
  ```
  backend/
  ├── .env.example
  ├── package.json
  └── src/
      ├── server.js
      └── routes/
          └── generateNotes.js
  ```
- **Configurações**:
  - Porta padrão: 4000
  - CORS habilitado para desenvolvimento
  - Variáveis de ambiente: PORT, GEMINI_API_KEY
  - Dependências principais: express, cors, dotenv, @google-ai/generative-ai

#### Desktop (React + Electron)

- **Localização**: `desktop/`
- **Stack**: React, Electron, Axios
- **Estrutura**:
  ```
  desktop/
  ├── package.json
  ├── public/
  │   ├── index.html
  │   └── electron.js
  └── src/
      ├── App.jsx
      └── components/
  ```
- **Configurações**:
  - Template: CRA com PWA
  - Scripts para desenvolvimento concorrente
  - Comunicação com backend via http://localhost:4000

#### Mobile (React Native + Expo)

- **Localização**: `mobile/`
- **Stack**: React Native, Expo, Axios
- **Estrutura**:
  ```
  mobile/
  ├── app.json
  ├── package.json
  └── src/
      ├── App.jsx
      └── components/
  ```
- **Configurações**:
  - Expo managed workflow
  - Componentes nativos: TextInput, Picker, ScrollView
  - Comunicação com backend via fetch/axios

### Fluxo de Branches

- **main**: Código de produção estável
- **develop**: Branch de integração para desenvolvimento
- **feature/\***: Branches para novas funcionalidades

**Workflow recomendado**:

1. Criar feature branch a partir de `develop`
2. Desenvolver e testar localmente
3. Push e abrir pull request para `develop`
4. Code review e merge
5. Deploy periódico de `develop` para `main`

### Padrões de Código

#### API Endpoints

- `/generate-notes` - POST - Gerar anotações com Gemini AI
- Sempre validar entrada e tratar erros
- Retornar JSON estruturado com status e dados

#### Componentes React

- Usar JSX com componentes funcionais
- Hooks para gerenciamento de estado
- Props tipadas quando possível
- Componentes reutilizáveis em `/components`

#### Estilo e Formatação

- Usar camelCase para variáveis e funções
- PascalCase para componentes React
- Indentação de 2 espaços
- Semicolons obrigatórios

### Configurações de Environment

#### Backend (.env)

```
PORT=4000
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Package.json Scripts

**Backend**:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  }
}
```

**Desktop**:

```json
{
  "main": "public/electron.js",
  "scripts": {
    "react-start": "react-scripts start",
    "electron-start": "electron .",
    "dev": "concurrently \"npm:react-start\" \"npm:electron-start\"",
    "build": "react-scripts build"
  }
}
```

**Mobile**:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "build": "expo build"
  }
}
```

### CI/CD

Cada módulo possui seu próprio workflow GitHub Actions:

- `backend.yml`: Testes e validação do backend
- `desktop.yml`: Build da aplicação desktop
- `mobile.yml`: Build da aplicação mobile

Todos os workflows executam em:

- Push para qualquer branch
- Pull requests para `main` e `develop`

### Comandos de Setup

#### Instalação inicial:

```bash
# Backend
cd backend && npm install

# Desktop
cd desktop && npm install

# Mobile
cd mobile && npm install
```

#### Desenvolvimento:

```bash
# Backend
npm run dev

# Desktop
npm run dev

# Mobile
npm start
```

### Funcionalidades Principais

1. **Geração de Anotações**: Interface para inserir tópico e nível, gerar anotações via IA
2. **Multi-plataforma**: Versões desktop e mobile da mesma funcionalidade
3. **API Centralizada**: Backend único servindo ambas as plataformas
4. **CI/CD**: Deploy automatizado com GitHub Actions

### Boas Práticas

- Sempre testar localmente antes do push
- Manter dependências atualizadas
- Documentar mudanças importantes no README
- Usar variáveis de ambiente para configurações sensíveis
- Implementar tratamento de erros em todas as camadas
- Seguir princípios de design responsivo no frontend
