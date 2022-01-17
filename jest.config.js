// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  testEnvironment: "./app/spec/custom-jest-environment.ts",
};

module.exports = config;
