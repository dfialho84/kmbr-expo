# Resumo da Configuração Inicial — KMBR Expo

Data: 2026-05-25
Versão: 0.1.0

## O que foi configurado

Este documento resume a configuração completa do projeto KMBR Expo, permitindo que você inicie o desenvolvimento imediatamente.

### 1. Inicialização do Expo + React Native

- [x] `package.json` — Todas as dependências para desenvolvimento
- [x] `app.json` — Configuração Expo
- [x] `expo.config.js` — Configuração avançada Expo
- [x] `tsconfig.json` — TypeScript strict mode com path aliases
- [x] `babel.config.js` — Babel com NativeWind + path aliases
- [x] `metro.config.js` — Metro bundler com NativeWind integration
- [x] `index.js` — Entry point do app

### 2. Configuração de Ferramentas

- [x] ESLint — `.eslintrc.json` com TypeScript e React Native
- [x] Prettier — `.prettierrc.json` com formatting rules
- [x] Jest — `jest.config.js` e `jest.setup.js` para testes unitários
- [x] Tailwind + NativeWind — `tailwind.config.js` para estilização

### 3. Estrutura do Projeto

Criadas todas as pastas seguindo arquitetura hexagonal:

```
src/
├── domain/                      # Lógica de negócio
│   ├── entities/                # (pronto para entidades)
│   ├── repositories/            # Interfaces de repositório
│   ├── services/                # Interfaces de serviços
│   └── use-cases/__tests__/     # Exemplo de teste
│
├── adapters/                    # Implementações concretas
│   ├── repositories/            # (pronto para SQLite, AsyncStorage, etc.)
│   ├── storage/                 # (pronto para SecureStore, AsyncStorage)
│   └── services/                # (pronto para notificações, câmera, etc.)
│
├── infrastructure/              # Setup e inicialização
│   ├── database/index.ts        # Gerenciador de banco de dados
│   └── container/index.ts       # Injeção de dependência
│
└── ui/                          # Camada de apresentação
    ├── app/                     # Expo Router (telas)
    │   ├── _layout.tsx
    │   └── index.tsx            # Home screen (tela de boas-vindas)
    ├── components/              # Componentes reutilizáveis
    ├── hooks/                   # Custom hooks (bridges)
    └── stores/                  # Zustand stores

e2e/                            # Testes End-to-End
├── features/                    # Cenários Gherkin (.feature)
│   └── app-initialization.feature
├── step-definitions/            # Implementações TypeScript
│   └── app-initialization.steps.ts
├── support/                     # Hooks e utilidades
│   ├── hooks.ts
│   └── steps-shared.ts
├── cucumber.js                  # Config Cucumber
└── README.md                    # Guia E2E
```

### 4. Testes E2E configurados

- [x] Detox setup (`detox.config.ts`)
- [x] Cucumber integration (`e2e/cucumber.js`)
- [x] Exemplo de feature e steps (`app-initialization.feature`)
- [x] Hooks de lifecycle (BeforeAll, After Each)
- [x] Steps compartilhados (shared steps)

### 5. Documentação

- [x] **README.md** — Overview do projeto
- [x] **SETUP.md** — Instruções de instalação e setup
- [x] **DEVELOPMENT.md** — Guia completo de desenvolvimento
- [x] **e2e/README.md** — Guia detalhado de testes E2E
- [x] **CLAUDE.md** — Convenções do projeto (já existente)

### 6. Configurações de Desenvolvimento

- [x] `.env.example` — Template de variáveis de ambiente
- [x] `.gitignore` — Inclui node_modules, android/, ios/, .eas/
- [x] Scripts npm otimizados para cada tarefa

## Como começar

### 1. Instale as dependências
```bash
npm install
```

### 2. Inicie o app em desenvolvimento

**Opção 1: Web (mais rápido para desenvolvimento inicial)**
```bash
npm run dev
```
O app abrirá em http://localhost:19000

**Opção 2: iOS Simulator (macOS apenas)**
```bash
npm run ios
```

**Opção 3: Android Emulator**
```bash
npm run android
```

### 3. Verifique se está tudo funcionando

A tela inicial deve mostrar: "Bem-vindo ao KMBR"

### 4. Configure testes E2E (opcional agora, necessário para CI/CD)

```bash
npm run prebuild              # Gera android/ e ios/
npm run detox:build:ios       # Build para iOS
npm run detox:test:ios        # Roda teste de exemplo
```

## Próximos Passos Recomendados

1. **Primeiro teste:** `npm test` — deve passar com sucesso
2. **Primeiro PRD:** `/create-prd "Nome de uma Feature"` para documentar a primeira feature
3. **Primeiro desenvolvimento:** Siga o fluxo em `DEVELOPMENT.md`
4. **Primeiros testes E2E:** Crie cenários em `e2e/features/`

## Stack Instalado

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Runtime | Node.js | 18+ |
| Framework | Expo | ^52.0.0 |
| Framework | React Native | ^0.76.0 |
| Roteamento | Expo Router | ^3.4.8 |
| UI | NativeWind | ^2.0.12 |
| Linguagem | TypeScript | ^5.3.2 |
| Estado | Zustand | ^4.4.1 |
| Validação | Zod | ^3.22.4 |
| Banco | SQLite | expo-sqlite ^14.0.0 |
| Storage Seguro | SecureStore | expo-secure-store ^13.0.0 |
| Storage Simples | AsyncStorage | @react-native-async-storage ^1.21.0 |
| Testes Unit | Jest | ^29.7.0 |
| Testes Unit | RTL RN | @testing-library/react-native ^12.4.3 |
| Testes E2E | Detox | ^20.13.2 |
| Testes E2E | Cucumber | @cucumber/cucumber ^9.5.1 |
| Linting | ESLint | ^8.55.0 |
| Formatting | Prettier | ^3.1.0 |

## Arquivos de Configuração Criados

- `package.json` — 70+ dependências (prod + dev)
- `tsconfig.json` — Strict mode + path aliases
- `.eslintrc.json` — Regras para TS e React Native
- `.prettierrc.json` — Formatting rules
- `jest.config.js` — Test runner config
- `jest.setup.js` — Test environment setup
- `babel.config.js` — Transpilation + NativeWind
- `metro.config.js` — Metro bundler config
- `tailwind.config.js` — Tailwind colors, spacing, fonts
- `detox.config.ts` — E2E device and build configs
- `e2e/cucumber.js` — BDD framework config
- `app.json` — Expo manifest
- `expo.config.js` — Advanced Expo config

## Scripts Principais

```bash
# Desenvolvimento
npm run dev                    # Inicia app web
npm run ios                    # Inicia iOS Simulator
npm run android                # Inicia Android Emulator

# Validação de código
npm run type-check            # Verifica tipos TS
npm run lint                  # ESLint
npm run format                # Prettier

# Testes
npm test                      # Jest uma vez
npm run test:watch            # Jest em watch mode
npm run test:coverage         # Com relatório de cobertura

# E2E
npm run prebuild              # Gerar nativo (android + ios)
npm run detox:build:ios       # Build E2E iOS
npm run detox:test:ios        # Rodar E2E iOS

# Outros
npm run eject                 # Alias para prebuild
```

## Verificação de Funcionamento

### Quick Check — Tudo pronto?

```bash
# 1. Verificar dependências
npm list --depth=0

# 2. Verificar TypeScript
npm run type-check

# 3. Rodar teste de exemplo
npm test

# 4. Checar linting
npm run lint

# 5. Iniciar app (escolha uma plataforma)
npm run dev    # ou npm run ios / npm run android
```

Se todos os comandos acima passarem sem erro, o projeto está **100% pronto para desenvolvimento**.

## Notas Importantes

1. **Sem Backend:** Nenhum dado sai do dispositivo. Use SQLite, AsyncStorage ou SecureStore.
2. **Arquitetura Hexagonal:** Domain primeiro, depois adapters, depois UI.
3. **TypeScript Strict:** Nunca use `any`. Use `unknown` com narrowing se necessário.
4. **Testes:** Cada caso de uso deve ter testes unitários.
5. **E2E:** Sempre use `testID` para seletores, nunca selecione por texto.

## Suporte

- Leia `CLAUDE.md` para convenções do projeto
- Leia `DEVELOPMENT.md` para criar features novas
- Leia `e2e/README.md` para entender testes E2E
- Consulte `docs/sdd/` para padrões de documentação

---

**Status:** ✅ Pronto para desenvolvimento

**Próximo comando:** `npm install && npm run dev`
