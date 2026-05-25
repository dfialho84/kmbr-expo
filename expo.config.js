const { getDefaultConfig } = require('expo/config');

const config = getDefaultConfig(__dirname);

config.plugins = [...(config.plugins || []), ['expo-secure-store']];

module.exports = config;
