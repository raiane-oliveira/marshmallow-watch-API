import type { Locale } from "@/i18n"
import type { Genre } from "../entities/genre"

export interface GenresSearchParams {
  lang?: Locale
}

export interface GenresRepository {
  findManyFromMovies(params: GenresSearchParams): Promise<Genre[]>
  findManyFromShows(params: GenresSearchParams): Promise<Genre[]>
}
