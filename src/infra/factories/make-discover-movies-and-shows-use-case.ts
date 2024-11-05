import { TmdbMediasRepository } from "../third-apis/repositories/tmdb-medias-repository"
import { DiscoverMoviesAndShowsUseCase } from "@/domain/app/use-cases/discover-movies-and-shows"

export function makeDiscoverMoviesAndShowsUseCase() {
  const mediasRepository = new TmdbMediasRepository()
  const useCase = new DiscoverMoviesAndShowsUseCase(mediasRepository)

  return useCase
}
