import { Movie } from "@/domain/app/entities/movie"
import type {
  MovieParamsFilters,
  MovieSearchParams,
  MoviesRepository,
} from "@/domain/app/repositories/movies-repository"
import type { TmdbMovie } from "../interfaces/tmdb-movie"
import { TmdbMoviesMapper } from "../mappers/tmdb-movies-mapper"
import { TmdbApiProvider } from "../tmdb-api-provider"

export class TmdbMoviesRepository
  extends TmdbApiProvider
  implements MoviesRepository
{
  async findManyByRelease({
    page,
    sortBy = "popularity.desc",
    lang,
  }: MovieParamsFilters) {
    const response = await this.api(
      `/3/discover/movie?page=${page}&sort_by=${sortBy}&language=${lang ?? "en-US"}`
    )
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((tmdbMovie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(tmdbMovie)
    })
  }

  async search({ query, year, page, language }: MovieSearchParams) {
    const response = await this.api(
      `/3/search/movie?query=${query}&page=${page}&language=${language}&primary_release_year=${year}`
    )
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((movie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(movie)
    })
  }
}
