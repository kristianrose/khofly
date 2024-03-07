import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

installGlobals();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
    },
    plugins: [
      remix({
        ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.scss", "**/*.css.map"],
      }),
      tsconfigPaths(),
    ],
    // Scss stuff
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          includePaths: [path.join(__dirname, "src/styles")],
        },
      },
    },
    // ENV variables
    define: {
      "process.env.HOST": JSON.stringify(env.HOST),
      "process.env.SEARXNG_URL": JSON.stringify(env.SEARXNG_URL),
      "process.env.NOMINATIM_URL": JSON.stringify(env.NOMINATIM_URL),
      "process.env.IS_SELF_HOST": JSON.stringify(env.IS_SELF_HOST),
      "process.env.APP_NAME": JSON.stringify(env.APP_NAME),
    },
  };
});
