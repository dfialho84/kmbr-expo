# E2E Testing com Detox + Cucumber

Este diretório contém a configuração e testes end-to-end do app usando Detox (framework de teste mobile) e Cucumber (BDD com Gherkin).

## Estrutura

```
e2e/
├── features/           # Arquivos .feature (Gherkin) — cenários em linguagem natural
├── step-definitions/   # Implementações dos steps em TypeScript
├── support/            # Hooks de setup/teardown e utilidades compartilhadas
├── cucumber.js         # Configuração do Cucumber
└── README.md           # Este arquivo
```

## Pré-requisitos

1. **Gerar projeto nativo** (necessário uma única vez):
   ```bash
   npm run prebuild
   ```
   Isso cria as pastas `android/` e `ios/` com o código nativo necessário.

2. **Ter um simulador/emulador rodando:**
   - iOS: `open -a Simulator`
   - Android: Abra o Android Studio e inicie um emulador

## Workflow

### 1. Escrever um novo cenário

Crie um arquivo `.feature` em `e2e/features/`:

```gherkin
Feature: Login do usuário
  Como um usuário
  Quero fazer login na aplicação
  Para acessar minha conta

  Scenario: Login com credenciais válidas
    Given o app está aberto
    When toco no botão "Login"
    And insiro email "user@example.com"
    And insiro senha "password123"
    And toco no botão "Entrar"
    Then vejo a tela de home
```

### 2. Implementar os steps

Crie um arquivo correspondente em `e2e/step-definitions/<feature-name>.steps.ts`:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { element, by, expect as detoxExpect } from 'detox';

Given('o app está aberto', async () => {
  // App é inicializado automaticamente pelos hooks
});

When('toco no botão {string}', async (label: string) => {
  const button = element(by.text(label));
  await button.multiTap(1);
});

Then('vejo a tela de home', async () => {
  const homeText = element(by.text('Welcome'));
  await detoxExpect(homeText).toBeVisible();
});
```

### 3. Build da app para teste

```bash
# iOS
npm run detox:build:ios

# Android
npm run detox:build:android
```

### 4. Rodar os testes

```bash
# iOS
npm run detox:test:ios

# Android
npm run detox:test:android

# Feature específica
npm run detox:test:ios -- e2e/features/login.feature
```

## Convenções

### Nomenclatura
- Feature files: kebab-case — `login-user.feature`
- Step definition files: kebab-case com sufixo — `login-user.steps.ts`

### Seletores com testID
Sempre use `testID` para seletores estáveis (nunca selecionar por texto):

```tsx
// No componente
<TouchableOpacity testID="login-button">
  <Text>Login</Text>
</TouchableOpacity>

// No step
const button = element(by.id('login-button'));
```

### Limpeza de estado
Os hooks em `e2e/support/hooks.ts` cuidam de:
- Iniciar e encerrar o app
- Limpar keychain e storage entre cenários

## Recursos úteis

- [Detox Docs](https://wix.github.io/Detox/)
- [Cucumber.js Docs](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)

## Troubleshooting

### "Detox built app is not found"
Rode `npm run detox:build:ios` ou `npm run detox:build:android` antes de rodar os testes.

### Emulador/Simulator não inicia
- iOS: `open -a Simulator`
- Android: Abra Android Studio > Virtual Device Manager

### Seletores não funcionam
Verifique se o componente tem `testID` e se é visível na tela.
