module.exports = {
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'react',
    'react-hooks',
  ],
  env: {
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    'tsconfig.json',
    '.eslintrc.js',
    'vite.config.ts',
    'config-overrides.js',
    'jest.config.js',
    'jest.env.js',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'launchdarkly-react-client-sdk',
            importNames: ['useFlags'],
            message:
              'Please use: import { useDarklyFlags } from "@/features/darkly" for type-safety',
          },
          {
            name: '@opengovsg/design-system-react',
            importNames: ['useToast'],
            message:
              'Please use: import { useToast } from "modules/common/hooks"',
          },
          {
            name: '@chakra-ui/react',
            importNames: ['useToast'],
            message:
              'Please use: import { useToast } from "modules/common/hooks"',
          },
          {
            name: '@chakra-ui/react',
            importNames: [
              'Modal',
              'ModalContent',
              'ModalHeader',
              'ModalOverlay',
              'ModalBody',
              'ModalFooter',
            ],
            message: 'Please use: import { Modal } from "@/components/Modal"',
          },
        ],
      },
    ],
    // Rules for auto sort of imports
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Packages. `react` related packages come first.
          // Things that start with a letter (or digit or underscore), or
          // `@` followed by a letter.
          ['^react', '^@?\\w'],
          // Root imports
          // Shared imports should be separate from application imports.
          ['^(shared)(/.*|$)'],
          ['^(typings)(/.*|$)'],
          [
            '^(app)(/.*|$)',
            '^(assets|theme)(/.*|$)',
            '^(contexts)(/.*|$)',
            '^(constants)(/.*|$)',
            '^(hooks)(/.*|$)',
            '^(utils)(/.*|$)',
            '^(services)(/.*|$)',
            '^(components)(/.*|$)',
            '^(types)(/.*|$)',
            '^(templates)(/.*|$)',
          ],
          ['^(pages)(/.*|$)', '^(features)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
  },
}
