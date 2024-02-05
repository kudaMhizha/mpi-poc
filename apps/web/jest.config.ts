import {Config} from 'jest';

const config: Config = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.(png|js|ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  moduleNameMapper: {
    '@/web/(.*)': '<rootDir>/src/$1',
    '@uppy/core': '<rootDir>/src/mocks/tests/uppy.ts',
    '@uppy/react': '<rootDir>/src/mocks/tests/uppy.ts',
    '@uppy/aws-s3': '<rootDir>/src/mocks/tests/uppy.ts',
  },
  coverageReporters: [['lcovonly', {projectRoot: __dirname}]],
  coverageDirectory: '../../coverage/web/',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/node_modules/', '.*.svg'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
      diagnostics: {
        ignoreCodes: [1343],
      },
      astTransformers: {
        before: [
          {
            path: 'node_modules/ts-jest-mock-import-meta',
            options: {metaObjectReplacement: {url: 'https://www.url.com'}},
          },
        ],
      },
    },
  },
};

export default config;
