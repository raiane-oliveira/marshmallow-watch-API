import type { Locale } from "@/i18n"
import type { Media } from "../entities/media"

export interface MediasTrendingParams {
  lang?: Locale | string
  timeWindow: "day" | "week" | string
}

export interface MediasRepository {
  findManyByTrending(params: MediasTrendingParams): Promise<Media[]>
}
