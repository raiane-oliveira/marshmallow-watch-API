import { defineConfig } from "drizzle-kit"
import { env } from "./src/infra/env"

export default defineConfig({
  schema: "./src/infra/database/schema.ts",
  dialect: "postgresql",
  out: "./.migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
