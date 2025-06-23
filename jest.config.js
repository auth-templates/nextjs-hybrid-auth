const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    /**
   * @note Include the polyfills in the "setupFiles"
   * to apply them BEFORE the test environment.
   */
    setupFiles: [],
    testEnvironmentOptions: {
        /**
         * @note Opt-out from JSDOM using browser-style resolution
         * for dependencies. This is simply incorrect, as JSDOM is
         * not a browser, and loading browser-oriented bundles in
         * Node.js will break things.
         *
         * Consider migrating to a more modern test runner if you
         * don't want to deal with this.
         */
        customExportConditions: [''],
    },
    testEnvironment: 'jest-fixed-jsdom',
    coverageReporters: ["lcov", "html", "text"],
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.tsx", "src/**/*.ts"],
    coveragePathIgnorePatterns: ["index.tsx"],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            pageTitle: "Test Report",
            includeFailureMsg: false,
            outputPath: "coverage/reports/index.html",
        }],
        ['jest-junit', {
            outputDirectory: 'coverage/reports',
            outputName: 'report.xml'
        }]
    ],
    // coverageThreshold: {
    //   global: {
    //       branches: 20,
    //       functions: 30,
    //       lines: 50,
    //       statements: 50
    //   }
    // },
}

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  // https://github.com/vercel/next.js/issues/40183
  transformIgnorePatterns: ['node_modules/(?!next-intl)/']
});
