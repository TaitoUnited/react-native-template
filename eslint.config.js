const { defineConfig } = require('eslint/config');

const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginReactNativeA11y = require('eslint-plugin-react-native-a11y');
const pluginLingui = require('eslint-plugin-lingui');
const pluginLodash = require('eslint-plugin-lodash');
const pluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      'typescript-eslint': tseslint,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-native-a11y': pluginReactNativeA11y,
      lingui: pluginLingui,
      lodash: pluginLodash,
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // JavaScript rules
      'no-use-before-define': 'off',
      'no-var': 'error',
      'dot-notation': 'warn',

      // TypeScript-specific rules
      'typescript-eslint/ban-ts-comment': 'off',
      'typescript-eslint/no-var-requires': 'off',
      'typescript-eslint/explicit-function-return-type': 'off',
      'typescript-eslint/no-use-before-define': 'off',
      'typescript-eslint/no-explicit-any': 'warn',
      'typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      'typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],

      // React
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Lodash
      'lodash/import-scope': 'error',
      'lodash/prefer-lodash-method': 'off',
      'lodash/prefer-lodash-typecheck': 'off',
      'lodash/prefer-constant': 'off',
      'lodash/prefer-noop': 'off',
      'lodash/prop-shorthand': 'off',

      // Lingui
      'lingui/no-unlocalized-strings': [
        'error',
        {
          ignore: ['^(?![A-Z].*|\\w+\\s\\w+).+$', '^[A-Z0-9_-]+$'],
          ignoreNames: [
            { regex: { pattern: 'className', flags: 'i' } },
            { regex: { pattern: '^[A-Z0-9_-]+$' } },
            'targetName',
            'styleName',
            'src',
            'srcSet',
            'type',
            'id',
            'width',
            'height',
            'displayName',
            'Authorization',
          ],
          ignoreFunctions: [
            'styled',
            'cva',
            'cn',
            'track',
            'Error',
            'console.*',
            '*headers.set',
            '*.addEventListener',
            '*.removeEventListener',
            '*.postMessage',
            '*.getElementById',
            '*.dispatch',
            '*.commit',
            '*.includes',
            '*.indexOf',
            '*.endsWith',
            '*.startsWith',
            'require',
            'useState',
          ],
        },
      ],

      // Accessibility
      'react-native-a11y/has-accessibility-hint': 'warn',

      // Import sort/order
      'import/namespace': ['error', { allowComputed: true }],
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
  },

  // Add Prettier plugin last
  pluginPrettierRecommended,

  // Ignored files
  {
    ignores: [
      'android/',
      'ios/',
      'app.config.ts',
      'src/locales/',
      'src/graphql/generated.ts',
      'src/app/playground/',
      'src/components/playground/',
      'src/design-system/',
      'node_modules',
      'scripts/',
      'dist/*',
      '*.d.ts',
    ],
  },
]);
