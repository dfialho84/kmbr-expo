module.exports = {
  default: {
    require: ['e2e/step-definitions/**/*.steps.ts', 'e2e/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:e2e/results.html'],
    paths: ['e2e/features/**/*.feature'],
    dryRun: false,
    parallel: 2,
  },
};
