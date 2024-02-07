/* eslint-disable */
export default {
  displayName: 'infra',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.(png|js|ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'tsx', 'jsx'],
  testTimeout: 20000,
  coverageDirectory: '../../coverage/apps/infra',
};
