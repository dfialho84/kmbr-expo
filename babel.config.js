module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@domain': './src/domain',
            '@adapters': './src/adapters',
            '@infrastructure': './src/infrastructure',
            '@ui': './src/ui',
            '@mocks': './src/__mocks__',
          },
        },
      ],
    ],
  };
};
