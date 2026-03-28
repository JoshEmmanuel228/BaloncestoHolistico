import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to rewrite /static/ requests to root in dev
const staticRewritePlugin = () => ({
  name: 'static-rewrite',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith('/static/')) {
        req.url = req.url.replace('/static/', '/');
      }
      next();
    });
  },
});

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      mode === 'development' && staticRewritePlugin(),
    ],
    assetsInclude: ['**/*.JPG'],
    // Render Static Site sirve desde raíz. /static/ era para servir desde Flask.
    base: '/',
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
}); 