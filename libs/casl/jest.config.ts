import {Config} from 'jest';

const config: Config = {
  displayName: 'casl',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', {tsconfig: '<rootDir>/tsconfig.spec.json'}],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: [['lcovonly', {projectRoot: __dirname}]],
  coverageDirectory: '../../coverage/libs/casl/',
};

export default config;
