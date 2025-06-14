import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    splitting: false,
    cjsInterop: true,
    outDir: "dist",
    minify: true,
    clean: true,
    dts: true
    ...options
}));