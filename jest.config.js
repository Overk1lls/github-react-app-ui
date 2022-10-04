/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts|tsx?$': 'ts-jest',
    '\\.js|jsx?$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/src/index.tsx'],
  testRegex: 'src/.*\\.test\\.tsx?$',
  testMatch: ['<rootDir>/src/**/*.test.tsx?$', '<rootDir>/src/test/**/*.test.tsx?$'],
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
};

module.exports = config;