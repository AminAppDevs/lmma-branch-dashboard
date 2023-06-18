import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    host: true,
    port: 5173,
    hmr: {
      clientPort: 5173,
      port: 5174,
      overlay: false,
    },
  },
});
