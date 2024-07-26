import { defineConfig } from 'vite';
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
      amplify: resolve(mainRoot, 'amplify'),
    },
  },
});
