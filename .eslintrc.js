// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    // Base configurations
    'expo',
    '@react-native',
    'eslint:recommended',
    'prettier',

    // React and TypeScript
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',

    // Accessibility, Localization, and Utility Libraries
    'plugin:react-native-a11y/all',
    'plugin:lingui/recommended',
    'plugin:lodash/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'lodash',
    'lingui',
    'simple-import-sort',
    'prettier',
  ],
  rules: {
    // Formatting and style
    'prettier/prettier': 'error',

    // General JavaScript rules
    'no-use-before-define': 'off', // Disabled due to TypeScript rules
    'no-var': 'error', // Enforce modern `let` and `const`
    'dot-notation': 'warn', // Prefer dot notation where possible

    // TypeScript-specific rules
    '@typescript-eslint/ban-ts-comment': 'off', // Allow `@ts-ignore` comments
    '@typescript-eslint/no-var-requires': 'off', // Allow `require` usage
    '@typescript-eslint/explicit-function-return-type': 'off', // Allow function return to not be typed
    '@typescript-eslint/no-use-before-define': 'off', // Allow variable declaration before usage
    '@typescript-eslint/no-explicit-any': 'warn', // Allow `any` type
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
    ],
    // Enforce consistent type imports
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],

    // Import/export rules
    'import/namespace': ['error', { allowComputed: true }], // Enforces names exist at the time they are dereferenced, but allowing computed namespace member reference
    // Enforce consistent import order
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

    // React-specific rules
    'react/prop-types': 'off', // Not using PropTypes with TypeScript
    'react-hooks/rules-of-hooks': 'error', // Enforce correct Hook usage
    'react-hooks/exhaustive-deps': 'warn', // Check effect dependencies

    // Lodash-specific rules
    'lodash/import-scope': 'error', // Enforce scoped imports
    'lodash/prefer-lodash-method': 'off', // Prevents forcing Lodash methods over Native methods
    'lodash/prefer-lodash-typecheck': 'off', // Prevents forcing Lodash methods over Native methods
    'lodash/prefer-constant': 'off', // Prevents forcing Lodash methods over Native methods
    'lodash/prefer-noop': 'off', // Prevents forcing Lodash methods over Native methods
    'lodash/prop-shorthand': 'off', // Prevents the use of the _ callback shorthand

    // Lingui localization rules
    'lingui/no-unlocalized-strings': [
      // Ensures that all string literals, templates, and JSX text are wrapped using <Trans>, t, or msg for localization
      'error',
      {
        ignore: [
          // Ignore strings that don’t match specific patterns
          '^(?![A-Z].*|\\w+\\s\\w+).+$', // Non-uppercase or single-word strings
          '^[A-Z0-9_-]+$', // Ignore UPPERCASE strings
        ],
        ignoreNames: [
          { regex: { pattern: 'className', flags: 'i' } },
          { regex: { pattern: '^[A-Z0-9_-]+$' } }, // Ignore UPPERCASE names
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

    // Accessibility rules
    // Custom accessibility rules for React Native (provided by react-native-a11y plugin)
    'react-native-a11y/has-accessibility-hint': 'warn',
  },

  ignorePatterns: ['/dist/*', '*.d.ts'],
};
