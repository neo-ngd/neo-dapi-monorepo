module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended/all'],
  testTimeout: 30000,
  passWithNoTests: true,
  forceExit: true,
  detectOpenHandles: true,
};
