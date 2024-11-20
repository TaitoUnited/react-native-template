module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'macros',
      'react-native-reanimated/plugin', // NOTE: this plugin MUST be last
    ],
  };
};
