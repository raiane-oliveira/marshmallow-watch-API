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

export interface MoviesRepository {
  findManyByRelease(params: MovieParamsFilters): Promise<Movie[]>
}
