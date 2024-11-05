import { type Either, right } from "@/core/errors/either"
import type { Movie } from "@/domain/app/entities/movie"
import type {
  MovieParamsFilters,
  MoviesRepository,
} from "@/domain/app/repositories/movies-repository"

interface DiscoverMoviesUseCaseRequest extends MovieParamsFilters {}

type DiscoverMoviesUseCaseResponse = Either<
  null,
  {
    movies: Movie[]
  }
>

export class DiscoverMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute(
    props: DiscoverMoviesUseCaseRequest
  ): Promise<DiscoverMoviesUseCaseResponse> {
    const movies = await this.moviesRepository.findManyByFilter(props)

    return right({
      movies,
    })
  }
}
