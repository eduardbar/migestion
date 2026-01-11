import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    // Increase chunk size warning limit (Recharts is large)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching and smaller initial load
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          // Charts (large dependency)
          if (id.includes('node_modules/recharts/') || 
              id.includes('node_modules/d3-')) {
            return 'vendor-charts';
          }
          // React Query
          if (id.includes('node_modules/@tanstack/')) {
            return 'vendor-query';
          }
          // Socket.IO
          if (id.includes('node_modules/socket.io-client/') ||
              id.includes('node_modules/engine.io-')) {
            return 'vendor-socket';
          }
          // Icons
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          // State management & utilities
          if (id.includes('node_modules/zustand/') ||
              id.includes('node_modules/date-fns/')) {
            return 'vendor-utils';
          }
        },
      },
    },
    // Minification settings
    minify: 'esbuild',
    target: 'es2020',
  },
  // Optimize dependencies for dev server
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'recharts',
      '@tanstack/react-query',
      'zustand',
      'socket.io-client',
      'lucide-react',
      'date-fns',
    ],
  },
});
