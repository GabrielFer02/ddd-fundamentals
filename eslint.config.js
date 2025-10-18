import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
  { ignores: ['build', 'node_modules'] },

  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      eslintConfigPrettier,
    ],
    files: ['src/**/*.{ts,js}', 'src/**/*.spec.{ts,js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.nodeBuiltin, ...vitest.environments.env.globals },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      vitest,
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);
