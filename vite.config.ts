import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [remix(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        includePaths: [path.join(__dirname, "src/styles")],
      },
    },
  },
});