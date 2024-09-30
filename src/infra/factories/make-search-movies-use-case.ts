import { SearchMoviesUseCase } from "@/domain/app/use-cases/movies/search-movies"
import { TmdbMoviesRepository } from "../third-apis/repositories/tmdb-movies-repository"

export function makeSearchMoviesUseCase() {
  const repository = new TmdbMoviesRepository()
  const useCase = new SearchMoviesUseCase(repository)

  return useCase
}
