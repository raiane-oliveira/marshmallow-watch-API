import { right, type Either } from "@/core/errors/either"
import type { PaginationParams } from "@/core/pagination-params"
import type { Movie } from "@/domain/app/entities/movie"
import type { MoviesRepository } from "@/domain/app/repositories/movies-repository"
import type { Locale } from "@/i18n"

interface FetchUpcomingMoviesRequest extends PaginationParams {
  lang?: Locale | string
}

type FetchUpcomingMoviesResponse = Either<
  null,
  {
    movies: Movie[]
  }
>

export class FetchUpcomingMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    lang,
    page,
  }: FetchUpcomingMoviesRequest): Promise<FetchUpcomingMoviesResponse> {
    const movies = await this.moviesRepository.findManyByUpcoming({
      page,
      lang,
    })

    return right({
      movies,
    })
  }
}
