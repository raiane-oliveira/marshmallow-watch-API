import { DiscoverMoviesUseCase } from "@/domain/app/use-cases/movies/discover-movies"
import { TmdbApiRepository } from "../third-apis/tmdb-api-repository"

export function makeDiscoverMoviesUseCase() {
  const repository = new TmdbApiRepository()
  const useCase = new DiscoverMoviesUseCase(repository)

  return useCase
}
