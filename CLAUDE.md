# CLAUDE.md — Guia do Projeto

Este arquivo instrui o Claude Code sobre a stack, arquitetura e convenções deste projeto.
Leia-o integralmente antes de qualquer tarefa.

---

## Visão Geral

Aplicativo mobile desenvolvido com **React Native + Expo**.
Todo o estado e dados são persistidos **localmente no dispositivo** — não há backend, API remota ou autenticação de servidor.

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Expo](https://expo.dev) (SDK mais recente) com Expo Router |
| Linguagem | TypeScript (strict mode) |
| UI | React Native core + [NativeWind](https://www.nativewind.dev) (Tailwind para RN) |
| Navegação | [Expo Router](https://expo.github.io/router) (file-based routing) |
| Persistência simples | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) |
| Banco de dados local | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) para dados relacionais |
| Armazenamento seguro | [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) para dados sensíveis |
| Gerenciamento de estado | [Zustand](https://zustand-demo.pmnd.rs) |
| Validação | [Zod](https://zod.dev) |
| Testes unitários | [Jest](https://jestjs.io) + [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) |
| Testes E2E | [Detox](https://wix.github.io/Detox/) + [@cucumber/cucumber](https://cucumber.io) |
| Linter / Formatter | ESLint + Prettier |

> **Regra de ouro:** nenhum dado sai do dispositivo. Não instalar axios, fetch para APIs externas, Firebase, Supabase ou qualquer SDK de backend remoto sem aprovação explícita.

---

## Arquitetura Hexagonal (Ports & Adapters)

O projeto segue a **Arquitetura Hexagonal**. O domínio é o núcleo da aplicação e não conhece nenhum detalhe de framework, banco de dados ou UI.

```
src/
├── domain/                  # Núcleo — zero dependências externas
│   ├── entities/            # Entidades e tipos de domínio
│   ├── value-objects/       # Value objects imutáveis
│   ├── repositories/        # Interfaces (ports) de repositório
│   ├── services/            # Interfaces (ports) de serviços externos
│   └── use-cases/           # Casos de uso (regras de negócio puras)
│
├── application/             # Orquestração — usa domain, não sabe de RN/Expo
│   ├── dtos/                # Data Transfer Objects de entrada/saída
│   └── use-cases/           # Implementações dos casos de uso (opcional se no domain)
│
├── adapters/                # Adaptadores que implementam os ports
│   ├── repositories/        # Implementações concretas (SQLite, AsyncStorage…)
│   ├── storage/             # Wrappers de expo-secure-store / AsyncStorage
│   └── services/            # Implementações de serviços (notificações, câmera…)
│
├── infrastructure/          # Configuração e inicialização dos adaptadores
│   ├── database/            # Setup do expo-sqlite (migrations, schema)
│   └── container/           # Injeção de dependência / factory das instâncias
│
└── ui/                      # Camada de apresentação React Native
    ├── app/                 # Expo Router — rotas (screens)
    ├── components/          # Componentes reutilizáveis
    ├── hooks/               # Custom hooks (ponte UI ↔ use-cases)
    └── stores/              # Stores Zustand (estado de UI)
```

### Regras de dependência

```
ui  →  infrastructure/container  →  adapters  →  domain
                                                    ↑
                                          (nada aponta para fora)
```

- `domain/` **nunca** importa de `adapters/`, `infrastructure/` ou `ui/`.
- `adapters/` implementam interfaces definidas em `domain/repositories/` ou `domain/services/`.
- `ui/` chama **apenas** use-cases (via hooks) e lê stores Zustand. Nunca acessa repositórios diretamente.
- `infrastructure/container/` é o único lugar onde as dependências concretas são montadas (DI manual ou fábrica).

---

## Convenções de Código

### Nomenclatura

- **Entidades e Value Objects:** PascalCase, sufixo opcional descritivo — `User`, `ProductId`, `Money`
- **Interfaces de Port:** prefixo `I` — `IUserRepository`, `IStorageService`
- **Implementações de Adapter:** sufixo do mecanismo — `UserSQLiteRepository`, `SecureStorageService`
- **Casos de uso:** classe ou função com verbo no infinitivo — `CreateUser`, `ListProducts`, `deleteExpiredItems`
- **DTOs:** sufixo `Dto` — `CreateUserDto`, `UserResponseDto`
- **Hooks:** prefixo `use` — `useCreateUser`, `useProductList`
- **Stores Zustand:** sufixo `Store` — `useCartStore`, `useSettingsStore`
- **Arquivos:** kebab-case — `user-sqlite-repository.ts`, `create-user.use-case.ts`

### TypeScript

- `strict: true` sempre ativo.
- Prefira `type` a `interface` para modelos de domínio; use `interface` para contratos/ports.
- Nunca use `any`. Use `unknown` quando o tipo for indeterminado e faça narrowing explícito.
- Valide entradas externas (AsyncStorage, SQLite, formulários) com **Zod** antes de passar ao domínio.

### Testes unitários

- Cada caso de uso deve ter testes unitários com repositórios mockados.
- Mocks dos ports ficam em `src/__mocks__/`.
- Teste de componentes com React Native Testing Library focando em comportamento, não em implementação.
- Rodar antes de qualquer commit: `npx jest --passWithNoTests`.

### Testes E2E (Detox + Cucumber)

O projeto usa **Detox** para testes end-to-end em simulador/emulador e dispositivos reais, integrado ao **@cucumber/cucumber** para escrita de cenários em linguagem natural (Gherkin).

**Pré-requisito:** Detox exige o projeto nativo gerado. Rode `expo prebuild` antes de configurar ou rodar os testes E2E. Isso cria as pastas `android/` e `ios/`.

**Estrutura de pastas:**

```
e2e/
├── features/          # Arquivos .feature (Gherkin)
├── step-definitions/  # Implementações dos steps TypeScript
├── support/           # Hooks de setup/teardown (beforeAll, afterAll)
└── detox.config.ts    # Configuração do Detox (devices, apps, builds)
```

**Convenções:**

- Arquivos `.feature` em inglês, descrevendo comportamento do usuário final.
- Step definitions em TypeScript, um arquivo por feature.
- Usar `testID` nos componentes React Native para seletores estáveis — nunca selecionar por texto que pode mudar.
- Steps de navegação/setup que se repetem ficam em `e2e/support/steps-shared.ts`.
- Limpar o estado do app (AsyncStorage, SQLite) no hook `beforeEach` via `device.clearKeychain()` + reset de storage.

**Nomenclatura:**

- Feature files: kebab-case — `create-transaction.feature`
- Step definition files: kebab-case com sufixo — `create-transaction.steps.ts`

---

## Storage — Guia de Uso

| Tipo de dado | Solução |
|---|---|
| Dados estruturados / relacionais | `expo-sqlite` |
| Preferências e configurações simples | `AsyncStorage` |
| Tokens, chaves, dados sensíveis | `expo-secure-store` |
| Arquivos binários (imagens, docs) | `expo-file-system` |

Toda lógica de acesso a storage fica em `src/adapters/` implementando uma interface de `src/domain/repositories/` ou `src/domain/services/`. **Nunca chame AsyncStorage ou SQLite diretamente de um componente ou store Zustand.**

---

## Fluxo de uma Feature Nova

1. **Domínio primeiro:** defina a entidade, value objects e a interface do repositório em `domain/`.
2. **Caso de uso:** implemente a regra de negócio em `domain/use-cases/` usando apenas a interface do repositório.
3. **Adaptador:** implemente o repositório concreto em `adapters/repositories/` (SQLite, AsyncStorage etc.).
4. **Container:** registre a implementação no `infrastructure/container/`.
5. **Hook:** crie um custom hook em `ui/hooks/` que instancia o caso de uso via container e expõe estado/ações.
6. **UI:** use o hook no componente ou tela. A tela não sabe de SQLite, AsyncStorage ou qualquer detalhe de infra.

---

## Comandos Úteis

```bash
# Iniciar em modo desenvolvimento
npx expo start

# Rodar testes unitários
npx jest --watchAll

# Verificar tipos
npx tsc --noEmit

# Lint
npx eslint src --ext .ts,.tsx

# Gerar projeto nativo (necessário antes de rodar E2E pela primeira vez)
npx expo prebuild

# Build do app para E2E (Android)
npx detox build --configuration android.emu.debug

# Build do app para E2E (iOS)
npx detox build --configuration ios.sim.debug

# Rodar testes E2E (Android)
npx detox test --configuration android.emu.debug

# Rodar testes E2E (iOS)
npx detox test --configuration ios.sim.debug

# Rodar feature específica
npx detox test --configuration ios.sim.debug e2e/features/create-transaction.feature

# Build de produção (EAS)
eas build --platform android
eas build --platform ios
```

---

## O que NÃO fazer

- ❌ Não instalar dependências de rede/backend sem aprovação explícita.
- ❌ Não chamar `AsyncStorage`, `SQLite` ou `SecureStore` diretamente em componentes ou stores.
- ❌ Não importar nada de `adapters/` ou `infrastructure/` dentro de `domain/`.
- ❌ Não criar lógica de negócio dentro de componentes React Native.
- ❌ Não usar `useState` para estado global — use Zustand.
- ❌ Não usar `any` no TypeScript.
- ❌ Não pular testes de casos de uso.
- ❌ Não selecionar elementos nos testes E2E por texto ou índice — sempre use `testID`.
- ❌ Não rodar `detox test` sem antes ter feito `detox build` com o mesmo `--configuration`.
- ❌ Não esquecer de rodar `expo prebuild` ao adicionar/remover dependências nativas.
