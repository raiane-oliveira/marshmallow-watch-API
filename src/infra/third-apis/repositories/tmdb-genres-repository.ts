import type {
  GenresRepository,
  GenresSearchParams,
} from "@/domain/app/repositories/genres-repository"
import { TmdbApiProvider } from "../tmdb-api-provider"
import type { TmdbGenre } from "../interfaces/tmdb-genre"
import { TmdbGenresMapper } from "../mappers/tmdb-genre-mapper"

export class TmdbGenresRepository
  extends TmdbApiProvider
  implements GenresRepository
{
  async findManyFromMovies(params: GenresSearchParams) {
    const res = await this.api(
      `/genre/movie/list${params.lang && `?language=${params.lang}`}`
    )

    const { genres }: { genres: TmdbGenre[] } = await res.json()

    return genres.map(TmdbGenresMapper.toDomain)
  }

  async findManyFromShows(params: GenresSearchParams) {
    const res = await this.api(
      `/genre/tv/list${params.lang && `?language=${params.lang}`}`
    )

    const { genres }: { genres: TmdbGenre[] } = await res.json()

    return genres.map(TmdbGenresMapper.toDomain)
  }
}
