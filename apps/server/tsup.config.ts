import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/server.ts", "src/server-router.ts", "src/generate-contract.ts"],
  outDir: "dist",
  format: ["cjs"],
  splitting: !options.watch,
  sourcemap: !!options.watch,
  minify: !options.watch,
  dts: true,
  clean: !options.watch,
  treeshake: true,
}));
