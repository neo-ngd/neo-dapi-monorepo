module.exports = {
  root: true,
  env: { node: true, es2015: true },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import'],
  rules: {
    eqeqeq: ['error', 'always', { null: 'never' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroupsExcludedImportTypes: [],
      },
    ],
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': [
          'error',
          { allowArgumentsExplicitlyTypedAsAny: true },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/strict-boolean-expressions': ['error'],
      },
    },
  ],
  ignorePatterns: ['!.*', 'node_modules', 'dist'],
};
