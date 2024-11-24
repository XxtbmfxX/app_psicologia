const path = require('path');
const { getDefaultConfig } = require("@expo/metro-config");
const withStorybook = require("@storybook/react-native/metro/withStorybook");


/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = withStorybook(defaultConfig, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, "./.storybook"),
});
