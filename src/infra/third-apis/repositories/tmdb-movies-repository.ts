import type {
  MovieParamsFilters,
  MovieSearchParams,
  MoviesRepository,
  MovieUpcomingParams,
} from "@/domain/app/repositories/movies-repository"
import type { TmdbMovie } from "../interfaces/tmdb-movie"
import { TmdbMoviesMapper } from "../mappers/tmdb-movies-mapper"
import { TmdbApiProvider } from "../tmdb-api-provider"

export class TmdbMoviesRepository
  extends TmdbApiProvider
  implements MoviesRepository
{
  async findManyByUpcoming({ page, lang }: MovieUpcomingParams) {
    const response = await this.api(
      `/movie/upcoming?page=${page}&language=${lang ?? "en-US"}`
    )
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((tmdbMovie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(tmdbMovie)
    })
  }

  async findManyByFilter({
    page,
    sortBy = "popularity.desc",
    lang,
    releaseDateGte,
    releaseDateLte,
    genreIds,
  }: MovieParamsFilters) {
    const genres = genreIds ? genreIds.join(",") : null

    const response = await this.api(
      `/discover/movie?page=${page}&primary_release_date.gte=${releaseDateGte}&primary_release_date.lte=${releaseDateLte}&sort_by=${sortBy}&language=${lang ?? "en-US"}&include_adult=false${genres && `&with_genres=${genres}`}`
    )
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((tmdbMovie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(tmdbMovie)
    })
  }

  async search({ query, year, page, language }: MovieSearchParams) {
    const response = await this.api(
      `/search/movie?query=${query}&page=${page}&language=${language}&primary_release_year=${year}`
    )
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((movie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(movie)
    })
  }
}
