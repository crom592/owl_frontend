import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/owl/',
  plugins: [react()],
  server: {
    host: true,
    port: 4200,
    proxy: {
      '/api': {
        target: 'http://3.36.51.130:8000', // 실제 API 서버 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
      },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
