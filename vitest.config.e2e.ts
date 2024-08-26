import { defineConfig } from "vitest/config"
import tsConfigPaths from "vitest-tsconfig-paths"

export default defineConfig({
  plugins: [
    tsConfigPaths(),
  ],
  test: {
    include: ["**/*.e2e.spec.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./src/test/e2e/setup-e2e.ts"],
  },
})
