import { right, type Either } from "@/core/errors/either"
import type { Movie } from "@/domain/app/entities/movie"
import type {
  MovieSearchParams,
  MoviesRepository,
} from "@/domain/app/repositories/movies-repository"

interface SearchMoviesUseCaseRequest extends MovieSearchParams { }

type SearchMoviesUseCaseResponse = Either<
  null,
  {
    movies: Movie[]
  }
>

export class SearchMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({
    page,
    query,
    language,
    year,
  }: SearchMoviesUseCaseRequest): Promise<SearchMoviesUseCaseResponse> {
    const movies = await this.moviesRepository.search({
      query,
      page,
      language,
      year,
    })

    return right({
      movies,
    })
  }
}
