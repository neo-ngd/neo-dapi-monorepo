module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended/all'],
  passWithNoTests: true,
  forceExit: true,
  detectOpenHandles: true,
};
