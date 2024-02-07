import type {Config} from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  displayName: 'ui',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', {presets: ['@nx/react/babel']}],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageReporters: [
    'html',
    ['lcovonly', {projectRoot: __dirname}],
    'text-summary',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '.*.svg'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/libs/ui',
};

export default config;
