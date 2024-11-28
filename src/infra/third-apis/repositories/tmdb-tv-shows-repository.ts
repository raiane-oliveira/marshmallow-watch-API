import type {
  TvShowParamsFilters,
  TvShowParamsTopRated,
  TvShowSearchParams,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"
import type { TmdbTvShow } from "../interfaces/tmdb-tv-show"
import { TmdbTvShowsMapper } from "../mappers/tmdb-tv-shows-mapper"
import { TmdbApiProvider } from "../tmdb-api-provider"

export class TmdbTvShowsRepository
  extends TmdbApiProvider
  implements TvShowsRepository
{
  async findManyByFilter({
    page,
    sortBy = "popularity.desc",
    lang,
    genreIds,
  }: TvShowParamsFilters) {
    const genres = genreIds ? genreIds.join(",") : null

    const response = await this.api(
      `/discover/tv?page=${page}&sort_by=${sortBy}&language=${lang ?? "en-US"}${genres && `&with_genres=${genres}`}`
    )
    const tmdbTvShows = await response.json()

    return tmdbTvShows.results?.map((tmdbTvShow: TmdbTvShow) => {
      return TmdbTvShowsMapper.toDomain(tmdbTvShow)
    })
  }

  async findManyByTopRated({ page, lang }: TvShowParamsTopRated) {
    const res = await this.api(
      `/tv/top_rated?page=${page}&language=${lang ?? "en-US"}`
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
      `/search/tv?query=${query}&page=${page}&language=${language}&first_air_date_year=${firstAirDateYear}`
    )

    const tmdbTvShows = await response.json()

    return tmdbTvShows.results?.map((tvShow: TmdbTvShow) => {
      return TmdbTvShowsMapper.toDomain(tvShow)
    })
  }
}
