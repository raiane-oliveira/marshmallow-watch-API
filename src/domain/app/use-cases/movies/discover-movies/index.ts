import { Either, right } from "@/core/errors/either"
import { Movie } from "@/domain/app/entities/movie"
import { MovieParamsFilters, MoviesRepository } from "@/domain/app/repositories/movies-repository"

interface DiscoverMoviesUseCaseRequest extends MovieParamsFilters {
}

type DiscoverMoviesUseCaseResponse = Either<null, {
  movies: Movie[]
}>

export class DiscoverMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({ page, sortBy }: DiscoverMoviesUseCaseRequest): Promise<DiscoverMoviesUseCaseResponse> {
    const movies = await this.moviesRepository.findManyByRelease({
      page,
      sortBy,
    })

    return right({
      movies,
    })
  }
}
