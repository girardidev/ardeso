import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  sourcemap: !!options.watch,
  splitting: !options.watch,
  minify: !options.watch,
  dts: false,
  clean: !options.watch,
  treeshake: true,
}));
