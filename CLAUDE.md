# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install          # install dependencies
npm start            # start Expo dev server (scan QR for Expo Go)
npm run android      # start on Android emulator
npm run ios          # start on iOS simulator
npm run web          # start in browser
npm run lint         # run ESLint via expo lint
npm run reset-project  # move starter code to app-example/, reset app/ to blank
```

No test runner is configured yet.

## Architecture

This is an **Expo 54 / React Native 0.81.5** app using **Expo Router v6** for file-based navigation, **React 19.1**, and **TypeScript** (strict mode).

### Routing

All routes live in `app/`. Expo Router maps the filesystem to routes:

- `app/_layout.tsx` — root Stack navigator; wraps everything in `ThemeProvider`
- `app/(tabs)/_layout.tsx` — bottom tab navigator (group route)
- `app/(tabs)/index.tsx` — home tab
- `app/(tabs)/explore.tsx` — explore tab
- `app/modal.tsx` — modal screen (`presentation: 'modal'`)

Add new screens by creating files in `app/`. Add new tabs inside `app/(tabs)/`.

### Path aliases

`@/` resolves to the project root (configured in `tsconfig.json`). Use `@/components/...`, `@/hooks/...`, etc. for all non-relative imports.

### Theming

- `constants/theme.ts` — color tokens
- `hooks/use-color-scheme.ts` — wraps React Native's `useColorScheme` (`.web.ts` variant for web)
- `hooks/use-theme-color.ts` — resolves a color token for the current scheme
- `components/themed-text.tsx` / `components/themed-view.tsx` — theme-aware primitives; prefer these over raw `Text`/`View`

### Platform-specific files

Expo Router and Metro resolve platform suffixes automatically. Use `.ios.tsx` for iOS-only variants (example: `components/ui/icon-symbol.ios.tsx` vs `components/ui/icon-symbol.tsx`).

### Key components

- `components/ui/icon-symbol` — cross-platform icon wrapper (SF Symbols on iOS, Material on Android/web)
- `components/haptic-tab.tsx` — tab bar button with haptic feedback
- `components/parallax-scroll-view.tsx` — scrollable layout with parallax header
- `components/ui/collapsible.tsx` — accordion component
