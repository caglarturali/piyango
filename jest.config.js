module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 7000,
  bail: 1,
  coverageDirectory: 'output/coverage/jest',
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
