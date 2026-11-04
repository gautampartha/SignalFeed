import { defineConfig } from 'vite';
export default defineConfig({
  root: 'app',
  base: './',
  server: { port: 5180, strictPort: true },
  build: { outDir: '../dist', emptyOutDir: true },
});
