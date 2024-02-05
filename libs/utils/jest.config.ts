import type {Config} from 'jest';

const config: Config = {
  displayName: 'utils',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsConfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageReporters: [
    'html',
    ['lcovonly', {projectRoot: __dirname}],
    'text-summary',
  ],
  coverageDirectory: '../../coverage/libs/utils',
};

export default config;
