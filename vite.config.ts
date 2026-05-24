import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/kairos': {
        target: process.env.KAIROS_BASE_URL ?? 'http://localhost',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/kairos/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react(), tailwindcss()],
});
