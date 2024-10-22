import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 4200,
    proxy: {
      '/api': {
        target: 'https://api.owluda.com', // 실제 API 서버 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
      },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
