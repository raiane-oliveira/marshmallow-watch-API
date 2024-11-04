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
}

export interface MovieSearchParams extends PaginationParams {
  query: string
  language?: "en-US" | string
  year?: number
}

export interface MoviesRepository {
  findManyByRelease(params: MovieParamsFilters): Promise<Movie[]>
  search(params: MovieSearchParams): Promise<Movie[]>
}
