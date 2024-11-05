import type { PaginationParams } from "@/core/pagination-params"
import type { Movie } from "../entities/movie"
import type { Locale } from "@/i18n"

export interface MovieParamsFilters extends PaginationParams {
  lang?: Locale | string
  sortBy?:
    | "popularity.desc"
    | "popularity.asc"
    | "release.asc"
    | "release.desc"
    | "title.asc"
    | "title.desc"
    | string
  releaseDateGte?: string
  releaseDateLte?: string
}

export interface MovieSearchParams extends PaginationParams {
  query: string
  language?: "en-US" | string
  year?: number
}

export interface MovieUpcomingParams extends PaginationParams {
  lang?: Locale | string
}

export interface MoviesRepository {
  findManyByFilter(params: MovieParamsFilters): Promise<Movie[]>
  findManyByUpcoming(params: MovieUpcomingParams): Promise<Movie[]>
  search(params: MovieSearchParams): Promise<Movie[]>
}
