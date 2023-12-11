import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
 build: { manifest: true },
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  }
});