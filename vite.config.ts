/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import { resolve } from 'node:path';
const __dirname = new URL('.', import.meta.url).pathname;

const mainRoot: string = resolve(__dirname, '.');
const root: string = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '*': resolve(root, '*'),
      components: resolve(root, 'components'),
      contexts: resolve(root, 'contexts'),
      types: resolve(root, 'types'),
      amplify: resolve(mainRoot, 'amplify'),
      utils: resolve(root, 'utils'),
      constants: resolve(root, 'constants'),
      hooks: resolve(root, 'hooks'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
