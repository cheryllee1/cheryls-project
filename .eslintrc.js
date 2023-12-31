module.exports = {
  extends: ['opengovsg/javascript'],
  ignorePatterns: ['coverage', 'build', 'node_modules', 'jest.config.ts'],
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      extends: ['opengovsg'],
    },
    {
      files: ['frontend/**/*.ts', '*.tsx'],
      extends: ['opengovsg', 'opengovsg/react'],
    },
    {
      files: ['frontend/**/*.js', '*.jsx'],
      extends: ['opengovsg/javascript', 'opengovsg/react'],
    },
  ],
  rules: {
    'prettier/prettier': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          'backend/tsconfig.json',
          'shared/tsconfig.json',
          'frontend/tsconfig.json',
        ],
      },
    },
  },
};
