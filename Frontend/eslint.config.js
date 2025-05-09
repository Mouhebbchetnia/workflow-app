import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Ajout pour inclure les globals comme process (utile pour Vite)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react, // Ajout du plugin react
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect', // Détecte automatiquement la version de React
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // Ajout des règles recommandées de React
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Désactive l'obligation d'importer React (inutile avec React 17+)
      'react/jsx-uses-react': 'off', // Désactive cette règle (obsolète avec React 17+)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];