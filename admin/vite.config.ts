import * as path from "node:path";
import {defineConfig} from "vite";

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, '../core/src'),
    }
  }
});