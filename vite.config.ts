import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const kairosBaseUrl = process.env.KAIROS_BASE_URL;

  if (command === 'serve' && !kairosBaseUrl) {
    throw new Error('KAIROS_BASE_URL is required to proxy /kairos requests');
  }

  return {
    server: {
      proxy: {
        '/kairos': {
          target: kairosBaseUrl ?? 'http://localhost',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/kairos/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
