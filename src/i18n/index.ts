import { z } from "zod"

export const i18n = {
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
} as const

export type Locale = (typeof i18n)["locales"][number]

export const localeQuerySchema = z.object({
  lang: z.string().optional().default("en"),
})
