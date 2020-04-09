module.exports = {
  preset: 'ts-jest',
  testTimeout: 15000,
  bail: 1,
  coverageDirectory: 'output/coverage/jest',
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
