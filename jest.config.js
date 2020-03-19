module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  bail: 1,
  coverageDirectory: 'output/coverage/jest',
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
