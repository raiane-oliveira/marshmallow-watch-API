import { DiscoverTvShowsUseCase } from "@/domain/app/use-cases/tv-shows/discover-tv-shows"
import { TmdbTvShowsRepository } from "../third-apis/repositories/tmdb-tv-shows-repository"

export function makeDiscoverTvShowsUseCase() {
  const repository = new TmdbTvShowsRepository()
  const useCase = new DiscoverTvShowsUseCase(repository)

  return useCase
}
