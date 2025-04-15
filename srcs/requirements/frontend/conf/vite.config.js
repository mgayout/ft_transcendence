import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['transcendence.fr', 'localhost', '127.0.0.1']
  }
});
