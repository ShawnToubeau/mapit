import * as esbuild from "esbuild";
import envFilePlugin from "esbuild-envfile-plugin";
import pluginSvg from "esbuild-plugin-svg";

await esbuild.build({
  entryPoints: ["index.ts"],
  bundle: true,
  minify: true,
  target: ["chrome60", "firefox60", "safari11", "edge18"],
  outfile: "dist/index.js",
  plugins: [envFilePlugin, pluginSvg({})],
  loader: {
    ".png": "dataurl",
  },
});
