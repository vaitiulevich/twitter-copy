import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
