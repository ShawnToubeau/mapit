import * as esbuild from "esbuild";
import envFilePlugin from "esbuild-envfile-plugin";

await esbuild.build({
  entryPoints: ["index.ts"],
  bundle: true,
  minify: true,
  target: ["chrome60", "firefox60", "safari11", "edge18"],
  outfile: "dist/index.js",
  plugins: [envFilePlugin],
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl",
  },
});
