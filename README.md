# KmBr

App de controle de quilometragem e despesas, desenvolvido com Expo + React Native.

## Desenvolvimento

1. Instalar dependências

   ```bash
   npm install
   ```

2. Iniciar o servidor de desenvolvimento

   ```bash
   npm start
   ```

   Opções disponíveis no terminal:
   - Escanear o QR code com o **Expo Go** no celular
   - Pressionar `a` para abrir no emulador Android
   - Pressionar `i` para abrir no simulador iOS
   - Pressionar `w` para abrir no navegador

## Build para produção (Android)

O build é feito na nuvem via **EAS Build** (não precisa do Android Studio).

### Pré-requisitos

```bash
npm install -g eas-cli
eas login
```

### Gerar AAB para o Google Play

```bash
eas build -p android --profile production
```

Ao terminar, o EAS fornece um link para baixar o arquivo `.aab`. Faça o upload manualmente no [Google Play Console](https://play.google.com/console).

### Gerar APK para instalação direta (sem Play Store)

```bash
eas build -p android --profile preview
```

O plano gratuito do EAS inclui 30 builds/mês. Acompanhe os builds em [expo.dev](https://expo.dev).
