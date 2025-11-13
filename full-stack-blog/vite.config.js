import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Resolve JSX and other extensions
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  // Optimize Clerk and any other essential dependencies
  optimizeDeps: {
    include: ["@clerk/clerk-react"],
  },

  // Configure server to handle caching more effectively
  server: {
    // Disable Vite caching, helpful for development
    cache: false,
    // Enable strict port usage and hot module reloading
    strictPort: true,
    hmr: {
      overlay: true, // Show errors in the browser
    },
  },

  // Build options for cleaner builds and debugging
  build: {
    sourcemap: true, // Enable source maps for easier debugging
    // You can add other build optimizations here
  },
});
