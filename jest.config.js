module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx',
    '!**/*.d.ts',
    '!cdk.out/**/*',
    '!bin/**/*',
    '!esbuild.ts',
    '!cdk/ui-app.ts',
    '!ui/index.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
