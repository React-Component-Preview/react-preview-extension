// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  rootDir: "./app",
  verbose: true,
  testEnvironment: "./spec/setup/custom-jest-environment.ts",
};

module.exports = config;
