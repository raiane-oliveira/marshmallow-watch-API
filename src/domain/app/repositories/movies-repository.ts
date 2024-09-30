import type { PaginationParams } from "@/core/pagination-params"
import type { Movie } from "../entities/movie"

export interface MovieParamsFilters extends PaginationParams {
  sortBy?:
  | "popularity.desc"
  | "popularity.asc"
  | "release.asc"
  | "release.desc"
  | "title.asc"
  | "title.desc"
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
