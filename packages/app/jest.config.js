module.exports = {
  ...require('../../jest.config.js'),
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  setupFilesAfterEnv: [],
};
