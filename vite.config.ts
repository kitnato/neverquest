import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    checker({
      eslint: { lintCommand: "eslint --ext .ts,.tsx ." },
      overlay: false,
      typescript: true,
    }),
    react(),
    svgr(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "~animate.css": path.resolve(__dirname, "node_modules/animate.css"),
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    }
  },
});
