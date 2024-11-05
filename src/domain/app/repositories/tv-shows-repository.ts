import type { PaginationParams } from "@/core/pagination-params"
import type { TvShow } from "../entities/tv-show"
import type { Locale } from "@/i18n"

export interface TvShowParamsFilters extends PaginationParams {
  lang?: Locale | string
  sortBy?:
    | "popularity.desc"
    | "popularity.asc"
    | "release.asc"
    | "release.desc"
    | "title.asc"
    | "title.desc"
    | string
  firstAirDateGte?: string
  firstAirDateLte?: string
}

export interface TvShowParamsTopRated extends PaginationParams {
  lang?: Locale | string
}

export interface TvShowSearchParams extends PaginationParams {
  query: string
  language?: "en-US" | string
  firstAirDateYear?: number
}

export interface TvShowsRepository {
  findManyByTopRated(params: TvShowParamsTopRated): Promise<TvShow[]>
  findManyByFilter(params: TvShowParamsFilters): Promise<TvShow[]>
  search(params: TvShowSearchParams): Promise<TvShow[]>
}
