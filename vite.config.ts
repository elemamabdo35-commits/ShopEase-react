// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       "@app": path.resolve(__dirname, "./src/app"),
//       "@modules": path.resolve(__dirname, "./src/modules"),
//       "@shared": path.resolve(__dirname, "./src/shared"),
//       "@services": path.resolve(__dirname, "./src/services"),
//       "@assets": path.resolve(__dirname, "./src/assets"),
//     },
//   },
//   server: {
//     port: 5173,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@app": path.resolve(process.cwd(), "./src/app"),
      "@modules": path.resolve(process.cwd(), "./src/modules"),
      "@shared": path.resolve(process.cwd(), "./src/shared"),
      "@services": path.resolve(process.cwd(), "./src/services"),
      "@assets": path.resolve(process.cwd(), "./src/assets"),
    },
  },
});