module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 7000,
  bail: 1,
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
