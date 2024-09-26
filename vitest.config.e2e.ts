import tsConfigPaths from "vitest-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ["**/*.e2e.spec.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./src/test/e2e/setup-e2e.ts"],
  },
})
