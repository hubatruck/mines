import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync, execFile } from 'node:child_process';
import path from 'node:path';
import packageJson from './package.json' with { type: 'json' };

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

function generateRoutes(): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ['scripts/generate-routes.mjs'],
      {
        cwd: process.cwd(),
      },
      (error, stdout, stderr) => {
        if (stdout) {
          process.stdout.write(stdout);
        }

        if (stderr) {
          process.stderr.write(stderr);
        }

        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}

function routeGenerator(): Plugin {
  const routesDir = path.resolve('app/routes');

  return {
    name: 'generate-routes',

    async buildStart() {
      await generateRoutes();
    },

    async handleHotUpdate({ file, server }) {
      if (!file.startsWith(routesDir)) {
        return;
      }

      console.log(`[routes] changed: ${path.relative(process.cwd(), file)}`);

      await generateRoutes();

      // generated-routes.ts changed, so force the browser to reload.
      server.ws.send({
        type: 'full-reload',
      });

      return [];
    },
  };
}

export default defineConfig({
  plugins: [react(), routeGenerator()],
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
    GIT_COMMIT: JSON.stringify(commitHash),
  },
  // https://github.com/remix-run/react-router/issues/15255
  preview: { host: '127.0.0.1' },
  base: '/mines/',
});
