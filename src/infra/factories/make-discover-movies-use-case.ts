import { DiscoverMoviesUseCase } from "@/domain/app/use-cases/movies/discover-movies"
import { TmdbMoviesRepository } from "../third-apis/repositories/tmdb-movies-repository"

export function makeDiscoverMoviesUseCase() {
  const repository = new TmdbMoviesRepository()
  const useCase = new DiscoverMoviesUseCase(repository)

  return useCase
}
