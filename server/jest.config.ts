import { JestConfigWithTsJest } from 'ts-jest';
const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>', 'src'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: ['.*\\.spec\\.ts$', '.int-spec.ts$'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.service.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['db.schema.ts'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  maxWorkers: 1,
};

export default jestConfig;
