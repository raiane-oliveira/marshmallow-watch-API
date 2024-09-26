import { TmdbApiRepository } from "../third-apis/tmdb-api-repository"
import { DiscoverMoviesUseCase } from "@/domain/app/use-cases/movies/discover-movies"

export function makeDiscoverMoviesUseCase() {
  const repository = new TmdbApiRepository()
  const useCase = new DiscoverMoviesUseCase(repository)

  return useCase
}
