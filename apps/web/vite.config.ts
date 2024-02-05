import {defineConfig, loadEnv, searchForWorkspaceRoot} from 'vite';
import react from '@vitejs/plugin-react';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createEnv = require('./src/constants/env/createEnv').createEnv;

// https://vitejs.dev/config/
export default ({mode}: {mode: string}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const env = loadEnv(mode, process.cwd());
  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {}
  );

  // Env Variables Validation
  createEnv({runtimeEnv: process.env});

  return defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/web',
    envDir: '../../.env',
    envPrefix: 'VITE_',

    server: {
      port: 3000,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [react(), nxViteTsPaths()],
    define: envWithProcessPrefix,
    build: {
      outDir: '../../dist/apps/web',
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: {
        '@/web/': `${searchForWorkspaceRoot(process.cwd())}/apps/web/src/`,
      },
    },
  });
};
