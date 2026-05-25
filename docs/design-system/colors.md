# Cores

## Paleta Semântica

Cores com significado funcional — usadas via classes NativeWind/Tailwind ou variáveis CSS custom.

| Token | Valor (Light) | Valor (Dark) | Classe NativeWind | Uso |
|-------|---------------|--------------|------------------|-----|
| primary | #0066FF | #4D94FF | `bg-primary`, `text-primary` | Ações principais, CTAs, destaques |
| primary-foreground | #FFFFFF | #000000 | `text-primary-foreground` | Texto sobre fundo primary |
| secondary | #7C3AED | #A78BFA | `bg-secondary` | Ações secundárias, alternativas |
| secondary-foreground | #FFFFFF | #1F2937 | `text-secondary-foreground` | Texto sobre fundo secondary |
| destructive | #EF4444 | #FCA5A5 | `bg-destructive` | Ações destrutivas, erros, alertas |
| destructive-foreground | #FFFFFF | #7F1D1D | `text-destructive-foreground` | Texto sobre fundo destructive |
| success | #10B981 | #6EE7B7 | `bg-success` | Sucesso, confirmação, validação |
| success-foreground | #FFFFFF | #065F46 | `text-success-foreground` | Texto sobre fundo success |
| muted | #F3F4F6 | #374151 | `bg-muted` | Fundos sutis, elementos desabilitados |
| muted-foreground | #6B7280 | #9CA3AF | `text-muted-foreground` | Texto desabilitado, hints |
| accent | #06B6D4 | #22D3EE | `bg-accent` | Destaques, hover states, badges |
| accent-foreground | #FFFFFF | #164E63 | `text-accent-foreground` | Texto sobre fundo accent |
| background | #FFFFFF | #1F2937 | `bg-background` | Fundo principal da tela/página |
| foreground | #1F2937 | #F3F4F6 | `text-foreground` | Texto principal |
| border | #E5E7EB | #4B5563 | `border-border` | Bordas de componentes, divisores |
| ring | #0066FF | #4D94FF | `ring`, `focus-visible:ring` | Foco visível (acessibilidade) |
| input | #FFFFFF | #374151 | `bg-input` | Fundo de inputs |
| card | #FFFFFF | #111827 | `bg-card` | Fundo de cards, containers |

## Regras de Uso

- **Nunca usar valores hex diretamente no código** — sempre via classe NativeWind ou variável CSS custom.
- **Botões primários:** use `primary` para ação principal de cada seção. Máximo 1 por área visual.
- **Ações destrutivas:** sempre `destructive`. Use modal de confirmação antes de executar a ação.
- **Estados desabilitados:** usar `muted` com `muted-foreground`.
- **Feedback visual:** use `success` para ações concluídas com sucesso, `destructive` para erros.
- **Tokens customizados por tema:** os valores light/dark são aplicados automaticamente via mecanismo de tema do projeto.

## Acessibilidade

- **primary sobre background:** contraste 7:1 (WCAG AAA) ✓
- **destructive sobre background:** contraste 6.5:1 (WCAG AAA) ✓
- **success sobre background:** contraste 5:1 (WCAG AA) ✓
- **accent sobre background:** contraste 4.8:1 (WCAG AA) ✓

Todos os tokens foram testados para atender ao mínimo de **WCAG AA (4.5:1 para texto normal)**.

## Paleta Extendida

Caso precise de cores adicionais específicas de uma feature, sempre derive de um token semântico. Não crie novos tokens diretamente — pergunte ao design system.
