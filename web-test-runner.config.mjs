import failOnly from './test/lib/fail-only.mjs'

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: ['src/**/*']
  },
  testFramework: {
    config: {
      timeout: 10000
    }
  },
  plugins: [failOnly],
  browserStartTimeout: 60000,
  testsStartTimeout: 20000,
  testsFinishTimeout: 120000
};