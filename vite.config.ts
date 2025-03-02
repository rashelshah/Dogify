import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5172, // Change this if the port is busy (e.g., 5174, 3000, etc.)
    strictPort: true, // Ensures Vite doesn't switch to another port
    open: true, // Automatically opens the browser on startup
    hmr: {
      overlay: false, // Disable HMR error overlay
    },
  },
});