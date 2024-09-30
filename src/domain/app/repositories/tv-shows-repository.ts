import type { PaginationParams } from "@/core/pagination-params"
import type { TvShow } from "../entities/tv-show"

export interface TvShowParamsFilters extends PaginationParams {
  sortBy?:
    | "popularity.desc"
    | "popularity.asc"
    | "release.asc"
    | "release.desc"
    | "title.asc"
    | "title.desc"
}

export interface TvShowsRepository {
  findManyByRelease(params: TvShowParamsFilters): Promise<TvShow[]>
}
