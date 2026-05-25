# Estratégia de Testes — Setup do Projeto

## 1. Testes Unitários

Derivados dos métodos de domínio identificados no `design.md`: `SmokeUseCase` e validação de `SmokeItemDto` via Zod.

---

### UT-1: SmokeUseCase.execute() — caminho feliz

- **O que testa:** Execução completa do caso de uso com dados válidos — valida DTO com Zod, chama `save()` e `findById()` no port, retorna `SmokeResultDto` corretamente mapeado.
- **Casos cobertos:**
    - Caminho feliz: DTO válido (`label` e `value` preenchidos) → `SmokeResultDto` com `id`, `label`, `value` e `createdAt` retornados corretamente.
    - Verificação de mapeamento: `SmokeResultDto.label` e `SmokeResultDto.value` correspondem ao input original.
- **Mocks necessários:** `ISmokePersistenceRepository` (mock em `src/__mocks__/`) — `save()` retorna `SmokeItem` simulado; `findById()` retorna o mesmo item.
- **Rastreabilidade:** REQ-5

---

### UT-2: SmokeUseCase.execute() — validação Zod: label vazio

- **O que testa:** Rejeição de `SmokeItemDto` com `label` vazio pelo schema Zod antes de atingir o port.
- **Casos cobertos:**
    - `label: ""` → lança `DomainError` com `code: "SMOKE_VALIDATION_FAILED"`, `context.field: "label"`.
    - `save()` do mock **não é chamado** (validação falha antes).
- **Mocks necessários:** `ISmokePersistenceRepository` (mock) — verificação de que `save()` não foi invocado.
- **Rastreabilidade:** REQ-5 · constitution regra 3

---

### UT-3: SmokeUseCase.execute() — validação Zod: value vazio

- **O que testa:** Rejeição de `SmokeItemDto` com `value` vazio pelo schema Zod.
- **Casos cobertos:**
    - `value: ""` → lança `DomainError` com `code: "SMOKE_VALIDATION_FAILED"`, `context.field: "value"`.
    - `save()` do mock **não é chamado**.
- **Mocks necessários:** `ISmokePersistenceRepository` (mock).
- **Rastreabilidade:** REQ-5 · constitution regra 3

---

### UT-4: SmokeUseCase.execute() — validação Zod: label excede max(100)

- **O que testa:** Rejeição de `SmokeItemDto` com `label` com mais de 100 caracteres.
- **Casos cobertos:**
    - `label` com 101 caracteres → lança `DomainError` com `code: "SMOKE_VALIDATION_FAILED"`.
- **Mocks necessários:** `ISmokePersistenceRepository` (mock).
- **Rastreabilidade:** REQ-5 · constitution regra 3

---

### UT-5: SmokeUseCase.execute() — falha no save() do repositório

- **O que testa:** Propagação correta de erro quando `ISmokePersistenceRepository.save()` lança exceção.
- **Casos cobertos:**
    - Mock de `save()` lança erro genérico → `SmokeUseCase` relança como `DomainError` com `code: "SMOKE_SAVE_FAILED"` incluindo `context.cause`.
    - Erro não é silenciado (constitution regra 18).
- **Mocks necessários:** `ISmokePersistenceRepository` com `save()` configurado para lançar erro.
- **Rastreabilidade:** REQ-5 · constitution regra 4 · constitution regra 18

---

### UT-6: SmokeUseCase.execute() — falha no findById() do repositório

- **O que testa:** Propagação correta de erro quando `ISmokePersistenceRepository.findById()` lança exceção após `save()` bem-sucedido.
- **Casos cobertos:**
    - Mock de `findById()` lança erro → `SmokeUseCase` relança como `DomainError` com `code: "SMOKE_READ_FAILED"` incluindo `context.id` e `context.cause`.
- **Mocks necessários:** `ISmokePersistenceRepository` com `save()` retornando item e `findById()` lançando erro.
- **Rastreabilidade:** REQ-5 · constitution regra 4 · constitution regra 18

---

### UT-7: SmokeUseCase.execute() — findById() retorna null

- **O que testa:** Comportamento quando `findById()` retorna `null` (item não encontrado após inserção).
- **Casos cobertos:**
    - Mock de `findById()` retorna `null` → caso de borda: `SmokeUseCase` trata ausência de retorno (lança `DomainError` ou retorna valor nulo mapeado, conforme contrato definido no design).
- **Mocks necessários:** `ISmokePersistenceRepository` com `findById()` retornando `null`.
- **Rastreabilidade:** REQ-5

---

### UT-8: SmokeItemDto — conformidade com schema Zod (tipos corretos)

- **O que testa:** Que o schema Zod de `SmokeItemDto` aceita entradas válidas e rejeita tipos incorretos.
- **Casos cobertos:**
    - `label: 123` (número em vez de string) → falha de validação Zod.
    - `label: "ok", value: null` → falha de validação Zod.
    - Input completamente válido → parse bem-sucedido.
- **Mocks necessários:** nenhum — domínio puro (Zod schema isolado).
- **Rastreabilidade:** REQ-5 · constitution regra 3

---

## 2. Testes de Integração

Derivados dos componentes de infraestrutura do `design.md`: `SmokeSQLiteRepository`, `adapters/storage/` e `infrastructure/database/`.

---

### IT-1: SmokeSQLiteRepository.save() — persistência real em SQLite

- **O que testa:** Que o adaptador concreto persiste um `SmokeItem` no banco SQLite em modo de teste e retorna o item com `id` gerado pelo banco.
- **Dependências reais usadas:** expo-sqlite em banco de teste (`:memory:` ou arquivo temporário isolado por suite).
- **Casos cobertos:**
    - `save({ label: "test", value: "val" })` → retorna `SmokeItem` com `id` numérico gerado, `label`, `value` e `createdAt` ISO 8601.
    - Persistência verificada: `findById(id)` após `save()` retorna o mesmo item.
- **Setup necessário:** Banco de teste inicializado com migration que cria tabela `SmokeItem`; tabela limpa antes de cada teste.
- **Rastreabilidade:** REQ-5 · NFR-1

---

### IT-2: SmokeSQLiteRepository.findById() — leitura real em SQLite

- **O que testa:** Que o adaptador lê corretamente um `SmokeItem` existente e retorna `null` para IDs inexistentes.
- **Dependências reais usadas:** expo-sqlite em banco de teste.
- **Casos cobertos:**
    - `findById(id)` com ID existente → retorna `SmokeItem` com todos os campos corretos.
    - `findById(999)` com ID inexistente → retorna `null`.
- **Setup necessário:** Banco de teste com ao menos um `SmokeItem` pré-inserido via SQL direto.
- **Rastreabilidade:** REQ-5

---

### IT-3: infrastructure/database/ — inicialização e migration

- **O que testa:** Que o módulo de setup do banco cria a tabela `SmokeItem` corretamente na primeira execução e não falha em execuções subsequentes (idempotência de migration).
- **Dependências reais usadas:** expo-sqlite em banco de teste.
- **Casos cobertos:**
    - Primeira inicialização: tabela `SmokeItem` criada com colunas `id`, `label`, `value`, `createdAt`.
    - Segunda inicialização no mesmo banco: não lança erro (migration idempotente).
    - Schema verificado via `PRAGMA table_info(SmokeItem)`.
- **Setup necessário:** Banco limpo (arquivo temporário ou `:memory:`) criado antes de cada teste.
- **Rastreabilidade:** REQ-5 · NFR-1

---

### IT-4: adapters/storage/ — SecureStore wrapper (leitura/escrita)

- **O que testa:** Que o wrapper de `expo-secure-store` persiste e recupera valores corretamente, expondo interface tipada ao invés de acesso direto.
- **Dependências reais usadas:** expo-secure-store em ambiente de dispositivo/simulador de teste.
- **Casos cobertos:**
    - `set(key, value)` seguido de `get(key)` → retorna o valor armazenado.
    - `get(key)` com chave inexistente → retorna `null`.
    - `delete(key)` seguido de `get(key)` → retorna `null`.
- **Setup necessário:** Keychain limpo antes de cada teste (`device.clearKeychain()` em ambiente Detox ou limpeza manual em testes Jest nativos).
- **Rastreabilidade:** REQ-5 · constitution regra 7

---

### IT-5: adapters/storage/ — AsyncStorage wrapper (leitura/escrita)

- **O que testa:** Que o wrapper de `AsyncStorage` persiste e recupera preferências/configurações corretamente.
- **Dependências reais usadas:** AsyncStorage em ambiente de teste.
- **Casos cobertos:**
    - `set(key, value)` seguido de `get(key)` → retorna o valor armazenado.
    - `get(key)` com chave inexistente → retorna `null`.
    - `clear()` → todas as chaves removidas.
- **Setup necessário:** AsyncStorage limpo antes de cada teste.
- **Rastreabilidade:** REQ-5 · constitution regra 7

---

### IT-6: infrastructure/container/ — resolução de dependências (DI)

- **O que testa:** Que o container instancia `SmokeUseCase` injetando `SmokeSQLiteRepository` real e que a instância resolvida executa o fluxo completo (save + findById) sem erros.
- **Dependências reais usadas:** expo-sqlite em banco de teste; container real (sem mock).
- **Casos cobertos:**
    - `container.resolve(SmokeUseCase).execute(dto)` → retorna `SmokeResultDto` com dados corretos.
    - Container não instancia use-case diretamente em componente (constitution regra 21).
- **Setup necessário:** Banco de teste inicializado e migration executada; container configurado apontando para banco de teste.
- **Rastreabilidade:** REQ-5 · constitution regra 21

---

## 3. Testes E2E Gherkin

### Justificativa de ausência de cenários automatizáveis

O arquivo `docs/features/001-setup-projeto/scenarios.feature` contém apenas a declaração da feature (`Feature: Setup do Projeto`) sem nenhum `Scenario` definido. Conforme documentado no `design.md` (seção 5): _"scenarios.feature está vazio (feature puramente técnica/infraestrutural)"_.

Esta feature não gera fluxos de usuário final verificáveis por testes E2E Gherkin porque:

1. Seu escopo é exclusivamente técnico/infraestrutural — configuração de dependências, tooling e scaffold da arquitetura.
2. Não há comportamento de UI ou interação de usuário a ser descrito em linguagem Gherkin.
3. Os `stories.md` confirmam: _"Nenhuma estória de usuário foi criada para esta feature."_

**Consequência:** Nenhum `GH-*` é gerado para esta feature. A cobertura E2E desta feature será provida indiretamente pelos testes E2E das features de produto futuras, que dependerão do ambiente configurado aqui.

---

## 4. Testes de Segurança

Derivados dos NFRs de segurança de `nf-requirements.md` e das restrições da `constitution.md`. Esta feature não possui NFRs de segurança explicitamente numerados, mas a `constitution.md` e o design impõem restrições de segurança verificáveis.

---

### ST-1: Isolamento de dados sensíveis — SecureStore não exposto a componentes

- **O que verifica:** Que nenhum componente React Native ou Zustand store importa `expo-secure-store` diretamente — acesso ocorre exclusivamente via `adapters/storage/` e `ui/hooks/` (constitution regras 7, 15).
- **Vetor de ataque simulado:** Acesso direto a dados sensíveis (tokens, chaves) por código de UI sem passar pelas abstrações de segurança do adapter.
- **Casos cobertos:**
    - Análise estática (grep/ESLint rule): nenhum arquivo em `ui/` ou `domain/` importa `expo-secure-store` diretamente → zero ocorrências.
    - Análise estática: nenhum arquivo em `ui/` ou `domain/` importa `AsyncStorage` diretamente → zero ocorrências.
- **Rastreabilidade:** constitution regras 7, 15

---

### ST-2: Isolamento de domínio — sem vazamento de dependências externas para domain/

- **O que verifica:** Que nenhum arquivo em `domain/` importa de `adapters/`, `infrastructure/`, `ui/`, ou qualquer biblioteca externa exceto `zod` (constitution regras 1, 14, 17).
- **Vetor de ataque simulado:** Acoplamento acidental de lógica de negócio a framework ou biblioteca de infraestrutura, criando risco de comportamento não determinístico ou exposição de dados internos.
- **Casos cobertos:**
    - Análise estática: imports em `domain/` resolvem apenas para outros arquivos de `domain/` ou `zod` → zero violações.
    - Específico: nenhum import de `expo`, `react`, `@react-native`, `AsyncStorage`, `expo-sqlite` em `domain/`.
- **Rastreabilidade:** constitution regras 1, 14, 17

---

### ST-3: Conformidade com regra "no data leaves the device"

- **O que verifica:** Que o projeto não instala ou utiliza SDKs de rede/backend (axios, Firebase, Supabase, fetch para APIs externas) sem aprovação explícita (constitution regra 9 + PRD seção 1).
- **Vetor de ataque simulado:** Exfiltração inadvertida de dados do dispositivo via dependência de rede não autorizada adicionada ao `package.json`.
- **Casos cobertos:**
    - Análise estática de `package.json`: ausência de `axios`, `firebase`, `supabase`, `@supabase/supabase-js`, `@firebase/*` nas dependências.
    - Análise estática: ausência de chamadas `fetch()` ou `XMLHttpRequest` apontando para URLs externas em `src/`.
- **Rastreabilidade:** constitution regra 9 · PRD seção 1 ("nenhum dado sai do dispositivo")

---

### ST-4: Tipagem estrita — ausência de `any` no TypeScript

- **O que verifica:** Que nenhum arquivo `src/` usa o tipo `any`, prevenindo bypass de verificações de tipo que poderiam mascarar dados sensíveis ou erros de segurança (constitution regra 19).
- **Vetor de ataque simulado:** Uso de `any` como escape hatch que permite passagem de dados não validados entre camadas, contornando as verificações Zod e os contratos de tipo.
- **Casos cobertos:**
    - Análise estática (ESLint `@typescript-eslint/no-explicit-any`): zero ocorrências de `any` explícito em `src/`.
    - `npx tsc --noEmit` com `strict: true` não reporta erros relacionados a tipos implícitos.
- **Rastreabilidade:** constitution regra 19 · NFR-3

---

## Resumo de Cobertura

| Requisito | Unitário              | Integração            | E2E Gherkin | Segurança             |
| --------- | --------------------- | --------------------- | ----------- | --------------------- |
| REQ-1     | —                     | —                     | —           | —                     |
| REQ-2     | —                     | —                     | —           | —                     |
| REQ-3     | —                     | —                     | —           | —                     |
| REQ-4     | —                     | —                     | —           | —                     |
| REQ-5     | UT-1, UT-2, UT-3, UT-4, UT-5, UT-6, UT-7, UT-8 | IT-1, IT-2, IT-3, IT-6 | — | —                     |
| REQ-6     | —                     | —                     | —           | —                     |
| REQ-7     | —                     | —                     | —           | —                     |
| REQ-8     | —                     | —                     | —           | ST-4                  |
| REQ-9     | —                     | —                     | —           | —                     |
| NFR-1     | —                     | IT-1, IT-3            | —           | —                     |
| NFR-2     | —                     | —                     | —           | —                     |
| NFR-3     | —                     | —                     | —           | ST-4                  |
| NFR-4     | —                     | —                     | —           | —                     |
| NFR-5     | —                     | —                     | —           | —                     |
| constitution-7,15 | —             | IT-4, IT-5            | —           | ST-1                  |
| constitution-1,14,17 | —          | —                     | —           | ST-2                  |
| constitution-9 | —              | —                     | —           | ST-3                  |
| constitution-19 | —             | —                     | —           | ST-4                  |

> **Nota sobre REQ-9 / NFR-4 (README.md):** Estes requisitos são verificados por inspeção manual ou lint de documentação — não geram testes automatizáveis. A conformidade é validada no processo de code review (constitution regra 24).

> **Nota sobre E2E Gherkin:** Nenhum `GH-*` foi gerado pois `scenarios.feature` não contém `Scenario`s. Esta é uma feature puramente técnica/infraestrutural sem fluxos de usuário final. Ver seção 3 para justificativa completa.

---

**Total de testes especificados:**
- Unitários: 8 (UT-1 a UT-8)
- Integração: 6 (IT-1 a IT-6)
- E2E Gherkin: 0 (feature infraestrutural — justificado)
- Segurança: 4 (ST-1 a ST-4)
- **Total: 18 testes**
