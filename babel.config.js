module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['macros', 'module-resolver', 'react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  };
};
