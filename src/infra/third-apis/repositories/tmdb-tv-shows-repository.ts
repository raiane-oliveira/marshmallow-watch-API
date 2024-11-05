import type {
  TvShowParamsFilters,
  TvShowParamsTopRated,
  TvShowSearchParams,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"
import type { TmdbTvShow } from "../interfaces/tmdb-tv-show"
import { TmdbTvShowsMapper } from "../mappers/tmdb-tv-shows-mapper"
import { TmdbApiProvider } from "../tmdb-api-provider"
import type { TvShow } from "@/domain/app/entities/tv-show"

export class TmdbTvShowsRepository
  extends TmdbApiProvider
  implements TvShowsRepository
{
  async findManyByFilter({
    page,
    sortBy = "popularity.desc",
    lang,
  }: TvShowParamsFilters) {
    const response = await this.api(
      `/3/discover/tv?page=${page}&sort_by=${sortBy}&language=${lang ?? "en-US"}`
    )
    const tmdbTvShows = await response.json()

    return tmdbTvShows.results?.map((tmdbTvShow: TmdbTvShow) => {
      return TmdbTvShowsMapper.toDomain(tmdbTvShow)
    })
  }

  async findManyByTopRated({ page, lang }: TvShowParamsTopRated) {
    const res = await this.api(
      `/3/tv/top_rated?page=${page}&language=${lang ?? "en-US"}`
    )
    const tmdbTvShows = await res.json()

    return tmdbTvShows.results?.map((tmdb: TmdbTvShow) => {
      return TmdbTvShowsMapper.toDomain(tmdb)
    })
  }

  async search({
    query,
    firstAirDateYear,
    page,
    language,
  }: TvShowSearchParams) {
    const response = await this.api(
      `/3/search/tv?query=${query}&page=${page}&language=${language}&first_air_date_year=${firstAirDateYear}`
    )

    const tmdbTvShows = await response.json()

    return tmdbTvShows.results?.map((tvShow: TmdbTvShow) => {
      return TmdbTvShowsMapper.toDomain(tvShow)
    })
  }
}
