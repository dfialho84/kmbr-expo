# KMBR — Aplicativo Mobile com React Native + Expo

Aplicativo mobile desenvolvido com **React Native + Expo**, seguindo a **arquitetura hexagonal** (Ports & Adapters). Todo o estado e dados são persistidos localmente no dispositivo.

## Características

- **Framework:** React Native + Expo com Expo Router (file-based routing)
- **Linguagem:** TypeScript (strict mode)
- **UI:** NativeWind (Tailwind para React Native)
- **Persistência:** SQLite, AsyncStorage, SecureStore
- **Estado:** Zustand
- **Validação:** Zod
- **Testes:** Jest + React Native Testing Library
- **Testes E2E:** Detox + Cucumber
- **Arquitetura:** Hexagonal (Domain-Driven Design)

## Guias Rápidos

### Instalar e rodar em desenvolvimento
```bash
npm install
npm run dev         # Web
npm run ios         # iOS Simulator
npm run android     # Android Emulator
```

### Validar código
```bash
npm run type-check  # TypeScript
npm run lint        # ESLint
npm run format      # Prettier
npm test            # Jest
```

### Testes E2E
```bash
npm run prebuild                # Gerar projeto nativo (uma vez)
npm run detox:build:ios         # Build para iOS
npm run detox:test:ios          # Rodar testes
```

## Documentação

- **[SETUP.md](./SETUP.md)** — Instruções de configuração inicial
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** — Guia de desenvolvimento de features
- **[CLAUDE.md](./CLAUDE.md)** — Convenções e arquitetura do projeto
- **[docs/sdd/](./docs/sdd/)** — Sistema de Documentação de Design
- **[docs/features/](./docs/features/)** — PRDs das features
- **[e2e/README.md](./e2e/README.md)** — Guia de testes E2E

## Estrutura do Projeto

```
src/
├── domain/              # Lógica de negócio (sem dependências)
│   ├── entities/        # Classes de modelo de domínio
│   ├── repositories/    # Interfaces (ports)
│   ├── services/        # Interfaces de serviços externos
│   └── use-cases/       # Regras de negócio puras
│
├── adapters/            # Implementações concretas
│   ├── repositories/    # SQLite, AsyncStorage, etc.
│   ├── storage/         # SecureStore, AsyncStorage wrappers
│   └── services/        # Notificações, câmera, etc.
│
├── infrastructure/      # Setup e inicialização
│   ├── database/        # Configuração SQLite
│   └── container/       # Injeção de dependência
│
└── ui/                  # Camada de apresentação
    ├── app/             # Expo Router (telas)
    ├── components/      # Componentes reutilizáveis
    ├── hooks/           # Custom hooks (bridge domain ↔ UI)
    └── stores/          # Zustand stores (estado de UI)

e2e/                     # Testes end-to-end
├── features/            # Cenários em Gherkin (.feature)
├── step-definitions/    # Implementações em TypeScript
└── support/             # Hooks de setup/teardown
```

## Próximos Passos

1. **Rodar o app:** `npm run dev` (ou `npm run ios`)
2. **Criar uma feature:** `/create-prd <nome>` para PRD, depois `/create-user-stories <nome>` para histórias
3. **Desenvolver:** Siga o fluxo em [DEVELOPMENT.md](./DEVELOPMENT.md)
4. **Testar:** Escreva testes unitários em `src/**/__tests__/` e E2E em `e2e/features/`
5. **Validar:** `npm run type-check && npm run lint && npm test`

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia Expo em modo desenvolvimento (web) |
| `npm run ios` | Inicia no simulador iOS |
| `npm run android` | Inicia no emulador Android |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run lint` | Executa ESLint |
| `npm run format` | Formata com Prettier |
| `npm test` | Rodar testes unitários |
| `npm run test:watch` | Testes em watch mode |
| `npm run detox:build:ios` | Build para E2E (iOS) |
| `npm run detox:test:ios` | Rodar E2E (iOS) |
| `npm run prebuild` | Gerar pastas nativas `android/` e `ios/` |

## Regras de Ouro

- ✅ Nunca chame AsyncStorage, SQLite ou SecureStore diretamente de componentes — use adaptadores
- ✅ Domain não importa de adapters, infrastructure ou UI
- ✅ Use Zod para validar dados de entrada
- ✅ TypeScript em `strict: true` sempre
- ✅ Nenhum dado sai do dispositivo (sem APIs remotas)
- ✅ Sempre use `testID` em elementos testáveis

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Framework | Expo (SDK 52+) |
| Linguagem | TypeScript |
| UI | React Native + NativeWind |
| Navegação | Expo Router |
| Estado | Zustand |
| Validação | Zod |
| Persistência | SQLite, AsyncStorage, SecureStore |
| Testes Unit | Jest + React Native Testing Library |
| Testes E2E | Detox + Cucumber |

## Autores

Diego Fialho Rodrigues

## License

Proprietary
