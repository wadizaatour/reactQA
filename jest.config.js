const config = {
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  }
}

export default config
