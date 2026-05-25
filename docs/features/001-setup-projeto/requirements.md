# Requisitos Funcionais — Setup do Projeto

## Configuração do Ambiente de Desenvolvimento

**REQ-1**: When a developer runs the dependency installation command, the system shall install all required packages without critical errors, making the project ready for the next setup step.

> Fonte: PRD Objetivo 1 / Fluxo Principal passo C ("Executa npm install")

**REQ-2**: When a developer starts the application in development mode, the system shall launch the app on the simulator without crashes, displaying at least an initial screen.

> Fonte: PRD Objetivo 7 / Criterio de Sucesso "Simulador iOS/Android inicia sem crash" / Fluxo Principal passos D-E

**REQ-3**: When the application starts, the system shall recognize and navigate between at least two configured routes using file-based routing.

> Fonte: PRD Objetivo 2 / Criterio de Sucesso "Expo Router reconhece e navega entre pelo menos 2 rotas"

**REQ-4**: When a developer runs the unit test suite, the system shall execute at least one example test and report a passing result without errors.

> Fonte: PRD Objetivo 5 / Criterio de Sucesso "npm test passa em pelo menos 1 teste de exemplo" / Fluxo Principal passos F-G

**REQ-5**: When the smoke test is executed, the system shall successfully instantiate a state store, validate data using a schema validator, and perform a write-then-read cycle on the local database, all within the same test run.

> Fonte: PRD Criterio de Sucesso "Exemplo que instancia store + valida com Zod + insere/le dado em SQLite"

## Configuracao para Testes E2E

**REQ-6**: When a developer runs the native project generation command, the system shall generate the native project structure without errors, enabling the E2E build step.

> Fonte: PRD Fluxo Principal passos H-I ("Executa npx expo prebuild" / "Estrutura nativa gerada sem erros")

**REQ-7**: When a developer runs the E2E build command, the system shall compile the application for end-to-end testing without errors.

> Fonte: PRD Objetivo 6 / Criterio de Sucesso "detox build completa sem erros" / Fluxo Principal passos J-K

## Qualidade de Codigo

**REQ-8**: The system shall pass static type checking across all source files without type errors.

> Fonte: PRD Criterio de Sucesso "npx tsc --noEmit sem erros de tipo"

**REQ-9**: The system shall provide a documentation file containing step-by-step instructions for dependency installation, running the app in development mode, executing unit tests, and running E2E tests.

> Fonte: PRD Objetivo 8 / Criterio de Sucesso "README.md inclui instrucoes de install, dev, test, e2e"
