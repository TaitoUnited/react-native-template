module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@lingui/babel-plugin-lingui-macro',
      ['react-native-unistyles/plugin', { root: 'src' }],
      'react-native-reanimated/plugin', // NOTE: this plugin MUST be last
    ],
  };
};
