import { Given, When, Then } from '@cucumber/cucumber';
import { device, element, by, expect as detoxExpect } from 'detox';

Given('o app está aberto', async () => {
  // App is already launched in hooks
});

When('aguardo {int} segundo(s)', async (seconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
});

Then('a tela está visível', async () => {
  // App should be visible
});
