import { Given, Then } from '@cucumber/cucumber';
import { element, by, expect as detoxExpect } from 'detox';

Given('the app is open', async () => {
  // App is already launched in hooks before scenarios run
});

Then('I should see {string} text', async (text: string) => {
  const textElement = element(by.text(text));
  await detoxExpect(textElement).toBeVisible();
});
