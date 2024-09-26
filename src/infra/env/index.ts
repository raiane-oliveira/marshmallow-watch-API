import "dotenv/config"

import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).optional().default("prod"),
  PORT: z.coerce.number().optional().default(3333),

  DATABASE_URL: z.string().url(),

  JWT_SECRET: z.string(),

  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_ENDPOINT_API_URL: z.string().url(),

  MAILER_PORT: z.coerce.number().default(465),
  MAILER_HOST: z.string(),
  MAILER_SENDER_EMAIL: z.string().email(),
  MAILER_SENDER_PASS: z.string(),

  WEBSITE_URL: z.string().url(),

  TMDB_BASE_API_URL: z.string().url(),
  TMDB_API_KEY: z.string(),
})

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  throw new Error("Invalid environment variables!")
}

export const env = envParsed.data
