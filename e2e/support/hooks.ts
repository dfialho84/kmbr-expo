import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { device } from 'detox';

BeforeAll(async () => {
  await device.launchApp();
});

AfterAll(async () => {
  await device.sendToHome();
});

Before(async () => {
  await device.reloadReactNative();
});

After(async () => {
  // Cleanup after each scenario if needed
});
