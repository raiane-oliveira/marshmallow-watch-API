import { MovieParamsFilters, MoviesRepository } from "@/domain/app/repositories/movies-repository"
import { env } from "../env"
import { TmdbMoviesMapper } from "./mappers/tmdb-movies-mapper"
import { TmdbMovie } from "./interfaces/tmdb-movie"

export class TmdbApiRepository implements MoviesRepository {
  private baseUrl: URL

  constructor() {
    this.baseUrl = new URL(`/3`, env.TMDB_BASE_API_URL)
  }

  private api(endpoint: string, options?: RequestInit) {
    const url = new URL(endpoint, this.baseUrl)
    url.searchParams.append("api_key", env.TMDB_API_KEY)

    return fetch(url, options)
  }

  async findManyByRelease({ page, sortBy = "popularity.desc" }: MovieParamsFilters) {
    const response = await this.api(`/3/discover/movie?page=${page}&sort_by=${sortBy}`)
    const tmdbMovies = await response.json()

    return tmdbMovies.results?.map((tmdbMovie: TmdbMovie) => {
      return TmdbMoviesMapper.toDomain(tmdbMovie)
    })
  }
}
