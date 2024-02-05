import {Config} from 'jest';

const config: Config = {
  displayName: 'email-templates',
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
  coverageDirectory: '../../coverage/libs/email-templates',
};

export default config;
