// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// Learn more https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started#step-3-wrap-metro-config-with-reanimated-wrapper-recommended
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getSentryExpoConfig(__dirname);

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
