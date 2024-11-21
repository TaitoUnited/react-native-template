// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'expo',
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-native-a11y/ios',
    'plugin:lodash/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    '@eslint-react/eslint-plugin',
    'react',
    'lodash',
    // 'lingui',
    'simple-import-sort',
    'prettier',
  ],
  // overrides: [
  //   {
  //     files: ['**/*.{ts,tsx}'],
  //     extends: ['plugin:@eslint-react/recommended-legacy'],
  //   },
  // ],
  rules: {
    'prettier/prettier': 'error',

    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],

    // Lingui rules (more info here: https://github.com/lingui/eslint-plugin?tab=readme-ov-file#supported-rules)
    // 'lingui/no-unlocalized-strings': [
    //   'warn',
    //   // {
    //   //   ignore: ['rgba', 'rgb'],
    //   //   ignoreFunction: [
    //   //     'console.log',
    //   //     'console.error',
    //   //     'Error',
    //   //     'styled',
    //   //     'css',
    //   //   ],
    //   //   ignoreProperty: ['name', 'targetName'],
    //   //   ignoreAttribute: [],
    //   // },
    // ],
    // 'lingui/t-call-in-function': 2,
    // 'lingui/no-single-variables-to-translate': 2,
    // 'lingui/no-expression-in-message': 2,
    // 'lingui/no-single-tag-to-translate': 2,
    // 'lingui/no-trans-inside-trans': 2,
    // 'lingui/text-restrictions': [
    //   2,
    //   {
    //     rules: [
    //       {
    //         patterns: ["''", '’', '“'],
    //         message: 'Error message',
    //       },
    //     ],
    //   },
    // ],

    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '{~*,~*/**}',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
  ignorePatterns: ['/dist/*'],
};
