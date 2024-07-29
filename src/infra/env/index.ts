import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  PORT: z.coerce.number().optional().default(3333),
})

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  throw new Error("Invalid environment variables!")
}

export const env = envParsed.data
