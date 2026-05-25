import type { DetoxConfig } from 'detox';

const config: DetoxConfig = {
  testRunner: 'cucumber',
  apps: {
    ios: {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/kmbr.app',
      build: 'xcodebuild -workspace ios/kmbr.xcworkspace -scheme kmbr -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    android: {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..'
    },
  },
  devices: {
    simulator: {
      type: 'iOS',
      device: {
        type: 'iPhone 15',
      },
    },
    emulator: {
      type: 'Android',
      device: {
        avdName: 'Pixel_4_API_30',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      app: 'ios',
      device: 'simulator',
    },
    'ios.sim.release': {
      app: 'ios',
      device: 'simulator',
    },
    'android.emu.debug': {
      app: 'android',
      device: 'emulator',
    },
    'android.emu.release': {
      app: 'android',
      device: 'emulator',
    },
  },
  testRunner: 'cucumber',
  cucumber: {
    featurePath: 'e2e/features',
    scenarioFilter: '.*',
  },
};

export default config;
