# Guia de Setup — KMBR Expo

Este documento descreve como configurar o ambiente de desenvolvimento e rodar o app localmente.

## Pré-requisitos

- Node.js 18+ e npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Para iOS: macOS com Xcode instalado
- Para Android: Android Studio com emulador configurado

## Instalação

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Copie o arquivo de variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```

3. **Inicie o app em desenvolvimento:**
   ```bash
   npm run dev
   ```

## Rodando em diferentes plataformas

### iOS (Simulator)
```bash
npm run ios
```

### Android (Emulator)
```bash
npm run android
```

### Web (desenvolvimento)
```bash
npm run web
```

## Testes

### Testes unitários
```bash
npm test
npm run test:watch       # Watch mode
npm run test:coverage    # Com coverage
```

### Testes E2E (Detox + Cucumber)

#### Preparação (necessário apenas uma vez)
```bash
npm run prebuild
```

#### Build E2E
```bash
npm run detox:build:ios      # iOS
npm run detox:build:android  # Android
```

#### Rodar testes E2E
```bash
npm run detox:test:ios       # iOS
npm run detox:test:android   # Android
```

## Validação de código

### Type checking
```bash
npm run type-check
```

### Linter
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
```

## Estrutura do Projeto

```
src/
├── domain/              # Núcleo da lógica de negócio (zero dependências)
├── adapters/            # Implementações concretas (SQLite, AsyncStorage, etc)
├── infrastructure/      # Setup e configuração (database, DI container)
└── ui/                  # React Native + Expo Router (telas e componentes)

e2e/                     # Testes end-to-end com Detox + Cucumber
```

## Próximos passos

1. Rode o app com `npm run dev`
2. Crie uma feature usando `/create-user-stories <nome-da-feature>`
3. Configure E2E tests com `npm run detox:build:ios` ou `npm run detox:build:android`
4. Implemente features seguindo o ciclo: Domain → Adapter → Hook → Component
