import type {
  MovieParamsFilters,
  MoviesRepository,
} from "@/domain/app/repositories/movies-repository"
import type { TmdbMovie } from "../interfaces/tmdb-movie"
import { TmdbMoviesMapper } from "../mappers/tmdb-movies-mapper"
import { TmdbApiProvider } from "../tmdb-api-provider"

export class TmdbMoviesRepository
  extends TmdbApiProvider
  implements MoviesRepository {
  async findManyByRelease({
    page,
    sortBy = "popularity.desc",
  }: MovieParamsFilters) {
    const response = await this.api(
      `/3/discover/movie?page=${page}&sort_by=${sortBy}`
    )
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((tmdbMovie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(tmdbMovie)
    })
  }
}
