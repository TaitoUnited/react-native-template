const transformJSX = [
  '@babel/plugin-transform-react-jsx',
  { runtime: 'automatic' },
];

const moduleResolver = [
  'module-resolver',
  {
    root: ['./'],
    alias: {
      '^~(.+)': './src/\\1',
    },
    extensions: [
      '.ios.js',
      '.android.js',
      '.js',
      '.jsx',
      '.json',
      '.tsx',
      '.ts',
      '.native.js',
    ],
  },
];

module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      { useTransformReactJSXExperimental: true },
    ],
  ],
  plugins: [
    'macros',
    transformJSX,
    moduleResolver,
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: [
        'macros',
        transformJSX,
        moduleResolver,
        'transform-remove-console',
        'react-native-reanimated/plugin',
      ],
    },
  },
};
