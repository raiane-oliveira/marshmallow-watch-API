import { SearchTvShowsUseCase } from "@/domain/app/use-cases/tv-shows/search-tv-shows"
import { TmdbTvShowsRepository } from "../third-apis/repositories/tmdb-tv-shows-repository"

export function makeSearchTvShowsUseCase() {
  const repository = new TmdbTvShowsRepository()
  const useCase = new SearchTvShowsUseCase(repository)

  return useCase
}
