import type {
  TvShowParamsFilters,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"
import type { TmdbTvShow } from "../interfaces/tmdb-tv-show"
import { TmdbTvShowsMapper } from "../mappers/tmdb-tv-shows-mapper"
import { TmdbApiProvider } from "../tmdb-api-provider"

export class TmdbTvShowsRepository
  extends TmdbApiProvider
  implements TvShowsRepository
{
  async findManyByRelease({
    page,
    sortBy = "popularity.desc",
  }: TvShowParamsFilters) {
    const response = await this.api(
      `/3/discover/tv?page=${page}&sort_by=${sortBy}`
    )
    const tmdbTvShows = await response.json()

    return tmdbTvShows.results?.map((tmdbTvShow: TmdbTvShow) => {
      return TmdbTvShowsMapper.toDomain(tmdbTvShow)
    })
  }
}
