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
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['frontend/**/*.js', '*.jsx'],
      extends: ['opengovsg/javascript', 'opengovsg/react'],
    },
  ],
}
