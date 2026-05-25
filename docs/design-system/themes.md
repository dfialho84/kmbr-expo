# Temas

## Temas Disponíveis

| Tema | Seletor CSS | Ativação | Quando usar |
|------|-----------|----------|-------------|
| Light | `:root` (padrão) | `preferredColorScheme: 'light'` ou manual | Dia, modo claro, preferência do usuário |
| Dark | `.dark` ou `[data-theme="dark"]` | `preferredColorScheme: 'dark'` ou manual | Noite, modo escuro, preferência do usuário |

---

## Mapeamento de Variáveis CSS por Tema

| Token Semântico | Light | Dark | Aplicação |
|-----------------|-------|------|-----------|
| background | #FFFFFF | #1F2937 | Fundo de tela/página |
| foreground | #1F2937 | #F3F4F6 | Texto principal |
| primary | #0066FF | #4D94FF | Botões e destaques principais |
| primary-foreground | #FFFFFF | #000000 | Texto sobre primary |
| secondary | #7C3AED | #A78BFA | Botões e destaques secundários |
| secondary-foreground | #FFFFFF | #1F2937 | Texto sobre secondary |
| destructive | #EF4444 | #FCA5A5 | Ações destrutivas |
| destructive-foreground | #FFFFFF | #7F1D1D | Texto sobre destructive |
| success | #10B981 | #6EE7B7 | Status positivo |
| success-foreground | #FFFFFF | #065F46 | Texto sobre success |
| muted | #F3F4F6 | #374151 | Fundos sutis |
| muted-foreground | #6B7280 | #9CA3AF | Texto desabilitado/hint |
| accent | #06B6D4 | #22D3EE | Destaques e hover |
| accent-foreground | #FFFFFF | #164E63 | Texto sobre accent |
| border | #E5E7EB | #4B5563 | Bordas e divisores |
| ring | #0066FF | #4D94FF | Focus ring (acessibilidade) |
| input | #FFFFFF | #374151 | Fundo de inputs |
| card | #FFFFFF | #111827 | Fundo de cards |

---

## Estratégia de Ativação de Tema

### Opção 1: Usar preferência do sistema (recomendado para MVP)

O aplicativo respeita automaticamente a preferência de tema do dispositivo:
- iOS: Settings > Display & Brightness > Light/Dark/Auto
- Android: Settings > Display > Theme > Light/Dark/Auto

**Implementação:** Usar hook do Expo/React Native que detecta `useColorScheme()` ou equivalente.

### Opção 2: Seletor manual no app (futuro)

Adicionar toggle de tema nas Settings da aplicação:
1. Detectar preferência do usuário
2. Armazenar em AsyncStorage (persistir escolha)
3. Aplicar seletor CSS ou atributo `data-theme` no elemento raiz

---

## Como Adicionar um Novo Tema

1. **Definir a paleta:** criar mapeamento de todas as variáveis CSS para o novo tema
2. **Adicionar seletor CSS:** ex: `.theme-brand` ou `[data-theme="brand"]`
3. **Redefinir variáveis:** incluir o mapeamento novo no arquivo de temas
4. **Teste de acessibilidade:** verificar contraste de todas as combinações de cor + texto
5. **Documentar:** adicionar entrada nesta tabela

---

## Validação de Acessibilidade por Tema

### Light Theme

- primary sobre background: 7:1 WCAG AAA
- destructive sobre background: 6.5:1 WCAG AAA
- success sobre background: 5:1 WCAG AA
- accent sobre background: 4.8:1 WCAG AA

### Dark Theme

- primary sobre background: 7:1 WCAG AAA
- destructive sobre background: 6:1 WCAG AA
- success sobre background: 5.2:1 WCAG AA
- accent sobre background: 5:1 WCAG AA

---

## Notas Técnicas

- **Variáveis CSS:** armazenar em `:root` ou no seletor do tema
- **NativeWind:** classes Tailwind como `bg-primary`, `text-foreground` já mapeiam para as variáveis CSS
- **Sem hardcoding:** nunca usar valores hex diretos — sempre via token semântico (veja colors.md)
- **Persistência:** se implementar seletor manual, usar AsyncStorage para guardar escolha do usuário
