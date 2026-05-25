# Espaçamento

## Escala Base

O projeto usa a **escala Tailwind padrão** com base **4px**:

| Token | Valor | Classe NativeWind | Referência | Uso típico |
|-------|-------|------------------|------------|------------|
| xs | 4px | `p-1`, `m-1`, `gap-1` | `var(--space-xs)` | Espaçamento mínimo entre elementos |
| sm | 8px | `p-2`, `m-2`, `gap-2` | `var(--space-sm)` | Padding interno de componentes pequenos (badges, chips) |
| md | 12px | `p-3`, `m-3`, `gap-3` | `var(--space-md)` | Padding de inputs, small buttons |
| base | 16px | `p-4`, `m-4`, `gap-4` | `var(--space-base)` | Padding padrão de cards, seções |
| lg | 24px | `p-6`, `m-6`, `gap-6` | `var(--space-lg)` | Padding de containers principais |
| xl | 32px | `p-8`, `m-8`, `gap-8` | `var(--space-xl)` | Espaçamento entre seções principais |
| 2xl | 48px | `p-12`, `m-12`, `gap-12` | `var(--space-2xl)` | Espaçamento de blocos de página |
| 3xl | 64px | `p-16`, `m-16`, `gap-16` | `var(--space-3xl)` | Espaçamento de seções hero / full-screen |

## Regras de Uso

- **Padding interno de componentes:** usar escala `xs` a `md`
- **Gap entre itens de lista:** usar escala `xs` a `sm`
- **Padding de cards e seções:** usar escala `base` a `lg`
- **Margin between sections:** usar escala `xl` a `3xl`
- **Nunca usar valores arbitrários** — ajustar sempre para o token mais próximo
- **Consistência:** aplicar espaçamento via classes Tailwind, nunca inline styles ou valores hardcoded

## Espaçamento Específico por Tipo de Componente

| Componente | Padding | Gap Interna | Margin Externa |
|------------|---------|-------------|----------------|
| Button | `px-4 py-2` (base: p-4 y ajustado) | N/A | `m-2` entre botões |
| Input | `px-3 py-2` | N/A | `mb-3` para label abaixo |
| Card | `p-4` (md) a `p-6` (lg) | gap-3 para conteúdo interno | `mb-4` entre cards |
| List Item | `px-3 py-2` | gap-2 entre elementos | N/A |
| Modal/Dialog | `p-6` | gap-4 entre seções | N/A |
| Page/Screen | `px-4 py-6` a `p-8` | N/A | N/A |

## Container e Layout

- **Container máximo:** sem limite fixo (mobile-first, full-width)
- **Padding lateral da tela:** `px-4` (16px) — padrão mobile
- **Padding superior da tela:** `pt-6` (24px) após barra de status/header
- **Grid padrão:** gap `gap-4` (16px) entre colunas e linhas
