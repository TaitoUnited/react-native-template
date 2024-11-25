// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// Learn more https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started#step-3-wrap-metro-config-with-reanimated-wrapper-recommended
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
  compress: {
    // The option below removes all console logs statements in production.
    drop_console: true,
  },
};

config.transformer.getTransformOptions = async () => ({
  // The following allows tree shaking and lazy loading. Learn more https://docs.expo.dev/guides/tree-shaking/
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

module.exports = wrapWithReanimatedMetroConfig(config);
