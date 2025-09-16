# 🤖 Anotations - Gerador de Anotações IA

Uma aplicação multi-plata### 🛠️ Técnicas

- 🔒 Autenticação segura com API Keys
- 🌐 API RESTful bem estruturada
- 🎨 Interface responsiva e moderna
- 🔧 Hot reload para desenvolvimento
- 📊 Monitoramento e logs
- 🧪 Testes automatizados

## 🤖 Google Gemini AI

### 🎯 Integração Avançada

O sistema utiliza o **Google Gemini 2.5 Pro** com configurações especializadas para geração de anotações educacionais:

- **🎓 Sistema de Instruções**: Prompt otimizado para conteúdo didático
- **📊 Streaming de Conteúdo**: Respostas em tempo real com chunks
- **🔧 Configurações de Segurança**: Personalizada para conteúdo educacional
- **🎯 Adaptação por Nível**: Conteúdo ajustado automaticamente

### 📋 Níveis de Conhecimento

| Nível                | Características                            | Público-Alvo                  |
| -------------------- | ------------------------------------------ | ----------------------------- |
| **🌟 Iniciante**     | Linguagem simples, exemplos cotidianos     | Estudantes iniciantes         |
| **🎯 Intermediário** | Vocabulário técnico explicado              | Estudantes em desenvolvimento |
| **🚀 Avançado**      | Abordagem analítica, termos especializados | Especialistas e acadêmicos    |

### 🔄 Fluxo de Geração

1. **Entrada**: Tópico + Nível de conhecimento
2. **Processamento**: Gemini AI com instruções especializadas
3. **Streaming**: Resposta em chunks para melhor UX
4. **Saída**: Anotações formatadas e estruturadas

## 🚀 Tecnologias geração de anotações inteligentes usando IA, desenvolvida com **TypeScript**, Node.js, React e React Native.

![Architecture](https://img.shields.io/badge/Architecture-Monorepo-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express%20%2B%20TS-green)
![Desktop](https://img.shields.io/badge/Desktop-React%20%2B%20Electron%20%2B%20TS-blue)
![Mobile](https://img.shields.io/badge/Mobile-React%20Native%20%2B%20Expo%20%2B%20TS-purple)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## 📋 Visão Geral

O **Anotations** é uma solução completa que permite gerar anotações personalizadas sobre qualquer tópico usando inteligência artificial. O sistema oferece:

- **Backend API**: Servidor Node.js + TypeScript com integração ao Google Gemini AI
- **Aplicação Desktop**: Interface React + TypeScript + Electron para Windows, macOS e Linux
- **Aplicação Mobile**: App React Native + TypeScript + Expo para iOS e Android

## 🏗️ Arquitetura do Projeto

```
anotations/
├── backend/              # API Node.js + Express + TypeScript
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   │   └── generateNotes.ts
│   │   └── tests/
│   │       └── server.test.ts
│   ├── dist/             # Arquivos compilados TypeScript
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── .env.example
├── desktop/              # Aplicação React + Electron + TypeScript
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── components/
│   ├── public/
│   │   ├── index.html
│   │   └── electron.js
│   ├── package.json
│   └── tsconfig.json
├── mobile/               # Aplicação React Native + Expo + TypeScript
│   ├── src/
│   │   ├── App.tsx
│   │   └── components/
│   ├── App.tsx
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   └── babel.config.js
├── .github/
│   └── workflows/        # CI/CD GitHub Actions
└── README.md
```

## 🚀 Funcionalidades

### ✨ Principais

- 📝 Geração de anotações personalizadas por IA
- 🎯 Níveis de conhecimento (Iniciante, Intermediário, Avançado)
- 💻 Interface desktop multiplataforma
- 📱 Aplicação mobile nativa
- 🔄 Sincronização em tempo real
- 📋 Copiar e compartilhar anotações

### 🛠️ Técnicas

- 🔒 Autenticação segura com API Keys
- 🌐 API RESTful bem estruturada
- 🎨 Interface responsiva e moderna
- 🔧 Hot reload para desenvolvimento
- 📊 Monitoramento e logs
- 🧪 Testes automatizados

## � Tecnologias

### Backend (TypeScript)

- **Node.js** + **Express** + **TypeScript**
- **Google Gemini AI** - Geração inteligente de conteúdo
- **Jest** + **TypeScript** - Testes automatizados
- **ts-node** - Execução TypeScript em desenvolvimento
- **ESLint** + **Prettier** - Qualidade de código

### Desktop (React + TypeScript)

- **React** + **TypeScript** + **Electron**
- **Styled Components** - Estilização tipada
- **Axios** - Cliente HTTP com tipos
- **Webpack** + **TypeScript** - Bundling e transpilação

### Mobile (React Native + TypeScript)

- **React Native** + **TypeScript** + **Expo**
- **Expo Vector Icons** - Ícones tipados
- **React Navigation** + **TypeScript** - Navegação tipada
- **AsyncStorage** - Armazenamento local

### DevOps e Qualidade

- **GitHub Actions** - CI/CD para TypeScript
- **TypeScript 5.2.2** - Type safety em todo o sistema
- **ESLint** + **@typescript-eslint** - Análise estática
- **Prettier** - Formatação de código
- **Husky** - Git hooks para qualidade

## �📦 Instalação

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Chave API do Google Gemini
- Git

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/anotations.git
cd anotations
```

### 2️⃣ Configure o Backend (TypeScript)

```bash
cd backend
npm install
cp .env.example .env
# Configure sua GEMINI_API_KEY no arquivo .env
npm run build  # Compila TypeScript para JavaScript
npm run dev     # Desenvolvimento com hot reload
```

### 3️⃣ Configure o Desktop (React + TypeScript)

```bash
cd ../desktop
npm install
npm run dev     # React + Electron com TypeScript
```

### 4️⃣ Configure o Mobile (React Native + TypeScript)

```bash
cd ../mobile
npm install
npx expo start  # Expo com TypeScript
```

## ⚙️ Configuração

### Backend (.env)

```env
PORT=4000
GEMINI_API_KEY=sua_chave_gemini_aqui
```

### Obter Chave API Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova API Key
3. Configure no arquivo `.env` do backend

## 🎮 Como Usar

### Desktop

1. Abra a aplicação
2. Digite o tópico que deseja estudar
3. Selecione seu nível de conhecimento
4. Clique em "Gerar Anotações"
5. Copie ou salve suas anotações

### Mobile

1. Abra o app
2. Insira o tópico de estudo
3. Escolha o nível (iniciante/intermediário/avançado)
4. Toque em "Gerar Anotações"
5. Use os botões para copiar ou limpar

## 🔧 Desenvolvimento

### Scripts Disponíveis

#### Backend

```bash
npm start          # Produção
npm run dev        # Desenvolvimento com nodemon
npm test           # Executar testes
```

#### Desktop

```bash
npm run dev        # Desenvolvimento (React + Electron)
npm run build      # Build de produção
npm run electron-build  # Gerar executável
```

#### Mobile

```bash
npm start          # Expo desenvolvimento
npm run android    # Build Android
npm run ios        # Build iOS
npm run web        # Versão web
```

### 🌿 Workflow Git

1. Crie uma feature branch: `git checkout -b feature/nova-funcionalidade`
2. Faça suas alterações e commits
3. Push: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request para `develop`

## 🧪 Testes

```bash
# Backend
cd backend && npm test

# Desktop
cd desktop && npm test

# Mobile
cd mobile && npm test
```

## 📈 CI/CD

O projeto inclui workflows GitHub Actions para:

- ✅ Testes automatizados
- 🔍 Análise de código
- 🔒 Auditoria de segurança
- 📦 Build automatizado
- 🚀 Deploy contínuo

## 🛡️ Segurança

- 🔐 Validação de entrada em todas as APIs
- 🛡️ Sanitização de dados
- 🔒 Variáveis de ambiente para dados sensíveis
- 🧪 Auditoria automática de dependências
- 🔍 CORS configurado adequadamente

## 📊 Performance

- ⚡ API otimizada para resposta rápida
- 🎛️ Cache inteligente
- 📱 Interface mobile responsiva
- 💾 Gerenciamento eficiente de memória
- 🔄 Lazy loading quando necessário

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma feature branch
3. Faça commit das suas mudanças
4. Push para a branch
5. Abra um Pull Request

### 📝 Convenções

- Use commits semânticos
- Documente novas funcionalidades
- Mantenha cobertura de testes
- Siga o guia de estilo do projeto

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**José Vitor Gomes Nascimento**

- GitHub: [@seu-usuario](https://github.com/ze543260)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-linkedin)
- Email: seu-email@exemplo.com

## 🙏 Agradecimentos

- Google Gemini AI pela API de IA
- Comunidade React e React Native
- Electron.js pela multiplataforma desktop
- Expo pela facilidade no desenvolvimento mobile

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. 🐛 [Reporte bugs](https://github.com/seu-usuario/anotations/issues)
2. 💡 [Solicite funcionalidades](https://github.com/seu-usuario/anotations/issues)
3. 📧 Entre em contato: seu-email@exemplo.com

---

<div align="center">
  <p>Desenvolvido com ❤️ usando React, Node.js e IA</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>
