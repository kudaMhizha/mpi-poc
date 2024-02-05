import {Config} from 'jest';

const config: Config = {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', {tsconfig: '<rootDir>/tsconfig.spec.json'}],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: [['lcovonly', {projectRoot: __dirname}]],
  coverageDirectory: '../../coverage/backend/',
};

export default config;
