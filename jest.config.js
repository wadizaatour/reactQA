const config = {
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/']
}

export default config
