import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 1. Establish default engine build directory ignore paths
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),

  // 2. Custom Application Architecture Enforcement Block
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.mjs'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@tanstack/query': tanstackQuery,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript rules for preventing unused variable pollution
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // TanStack Query stability boundaries (Phase 06 rules)
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
    },
  },

  // 3. Prettier override configuration (MUST be placed at the absolute end of the array)
  // This turns off all ESLint rules that might conflict with formatting decisions
  eslintConfigPrettier,
]);

export default eslintConfig;
