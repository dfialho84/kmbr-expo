# Tipografia

## Famílias de Fonte

| Família | Variável / Referência | Uso |
|---------|----------------------|-----|
| System Default (sans-serif) | `font-sans` (classe Tailwind) | Texto geral, interface |
| Mono | `font-mono` (classe Tailwind) | Código, valores técnicos, IDs |

## Escala Tipográfica

| Nível | Classe NativeWind | Tamanho | Peso | Line Height | Uso |
|-------|------------------|---------|------|-------------|-----|
| Display | `text-4xl font-bold` | 36px | 700 | 1.2 | Títulos de tela hero, welcome screens |
| H1 | `text-3xl font-bold` | 30px | 700 | 1.25 | Título principal de página/tela |
| H2 | `text-2xl font-semibold` | 24px | 600 | 1.3 | Seções principais, card titles |
| H3 | `text-xl font-semibold` | 20px | 600 | 1.4 | Subseções, subtítulos |
| Body | `text-base` | 16px | 400 | 1.5 | Texto corrido, descrições |
| Small | `text-sm` | 14px | 400 | 1.5 | Labels, metadados, hints |
| Caption | `text-xs` | 12px | 400 | 1.4 | Legendas, timestamps, informações terciárias |

## Regras de Uso

- **H1 por tela:** cada tela tem no máximo 1 título H1 (semantic HTML e acessibilidade).
- **Display apenas em welcome/hero:** use sparingly para criar impacto visual.
- **Body para texto corrido:** padrão para descrições, conteúdo de lista, diálogos.
- **Small para metadata:** datas, horários, contadores, informações secundárias.
- **Caption para informações terciárias:** tooltips, footnotes, small print.
- **Nunca usar tamanhos arbitrários:** sempre ajustar para o nível mais próximo da escala.
- **Contrast com cores:** verifique que o texto atende WCAG AA quando combinado com a cor de fundo (veja colors.md).

## Pesos de Fonte

- **400 (Regular):** corpo de texto, descrições
- **600 (Semibold):** subtítulos, labels, ênfase
- **700 (Bold):** títulos, destaques fortes
