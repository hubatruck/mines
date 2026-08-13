// eslint.config.mjs

import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    // ---------------------------------------------------------------------------
    // Ignore
    // ---------------------------------------------------------------------------
    {
        ignores: [
            'vite.config.ts',
            'dist/**',
            "**/generated-routes.ts",
        ],
    },

    // ---------------------------------------------------------------------------
    // TypeScript
    // ---------------------------------------------------------------------------
    {
        files: ['**/*.{ts,tsx}'],

        extends: [
            js.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parserOptions: {
                projectService: true,
            },
        },

        settings: {
            'import/resolver': {
                typescript: true,
            },
        },

        rules: {
            'no-console': 'off',
            'no-param-reassign': 'off',
            'no-plusplus': 'off',
            'class-methods-use-this': 'off',
            'arrow-body-style': 'off',

            'no-underscore-dangle': ['error', { allow: ['_id'] }],

            'spaced-comment': 'error',

            'import/no-unresolved': 'error',
            'import/prefer-default-export': 'off',

            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: ['**/vite.config*'],
                },
            ],

            'require-await': 'error',

            'lines-between-class-members': [
                'error',
                'always',
                {
                    exceptAfterSingleLine: true,
                },
            ],

            '@typescript-eslint/no-use-before-define': 'error',
        },
    },

    // ---------------------------------------------------------------------------
    // React / TSX
    // ---------------------------------------------------------------------------
    {
        files: ['**/*.tsx'],

        extends: [
            react.configs.flat.recommended,
            react.configs.flat['jsx-runtime'],
            reactHooks.configs.flat.recommended,
        ],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            'react/jsx-props-no-spreading': 'off',
            'react/destructuring-assignment': 'off',

            'react/require-default-props': [
                'error',
                {
                    functions: 'defaultArguments',
                },
            ],

            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                },
            ],
        },
    },

    // ---------------------------------------------------------------------------
    // public/static JavaScript
    // ---------------------------------------------------------------------------
    {
        files: [
            'public/**/*.js',
            'static/**/*.js',
        ],

        extends: [
            js.configs.recommended,
        ],

        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },

        rules: {
            'no-alert': 'off',
        },
    },

    // ---------------------------------------------------------------------------
    // Prettier
    // ---------------------------------------------------------------------------
    eslintConfigPrettier,
);