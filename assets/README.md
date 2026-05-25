# Assets (Ícones e Splashes)

Este diretório contém os assets visuais do aplicativo.

## Arquivos esperados

Para que o app execute sem warnings, adicione os seguintes arquivos PNG:

- **icon.png** — Ícone do app (1024x1024px recomendado)
- **splash.png** — Tela de splash (2208x2208px recomendado)
- **adaptive-icon.png** — Ícone adaptativo Android (1024x1024px)
- **favicon.png** — Favicon para web (192x192px)

## Como adicionar

1. Crie/exporte as imagens em PNG
2. Adicione neste diretório
3. O Expo criará automaticamente as variações necessárias

## Geração rápida

Para desenvolvimento inicial, você pode usar placeholders:

```bash
# Gerar ícone placeholder com ImageMagick (se tiver instalado)
convert -size 1024x1024 xc:#6366f1 icon.png

# Ou use qualquer image editor para criar as imagens acima
```

## Referências

- [Expo Icons & Assets Guide](https://docs.expo.dev/guides/icons/)
- [App Icon Generator](https://www.appicon.co/)
