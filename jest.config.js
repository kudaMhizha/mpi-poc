import {getJestProjects} from '@nx/jest';

export default {
  projects: getJestProjects(),
  testEnvironment: 'jsdom',
  testTimeout: 20000,
};
