module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  watchman: false,
  moduleDirectories: ['node_modules', '.'],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json"
    }
  }
};
