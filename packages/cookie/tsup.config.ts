import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  splitting: !options.watch,
  sourcemap: !!options.watch,
  minify: !options.watch,
  dts: true,
  clean: !options.watch,
  treeshake: true,
}));
