import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        AudioWorkletGlobalScope: true,
      },
      parser: tsparser,
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint,
      '@eslint/js': pluginJs,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^react', '^@?\\w'], ['^src/', '^(../|./)']],
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    rules: {},
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {},
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {},
  },
];
