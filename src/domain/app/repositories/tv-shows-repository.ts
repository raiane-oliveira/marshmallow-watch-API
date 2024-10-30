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

export interface TvShowSearchParams extends PaginationParams {
  query: string
  language?: "en-US" | string
  firstAirDateYear?: number
}

export interface TvShowsRepository {
  findManyByRelease(params: TvShowParamsFilters): Promise<TvShow[]>
  search(params: TvShowSearchParams): Promise<TvShow[]>
}
