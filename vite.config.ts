import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import { visualizer } from "rollup-plugin-visualizer";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix(),
    tsconfigPaths(),
    // `emitFile` is necessary since Remix builds more than one bundle!
    visualizer({ emitFile: true }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        includePaths: [path.join(__dirname, "src/styles")],
      },
    },
  },
});
