import { TmdbMoviesRepository } from "../third-apis/repositories/tmdb-movies-repository"
import { TmdbTvShowsRepository } from "../third-apis/repositories/tmdb-tv-shows-repository"
import { DiscoverMoviesAndShowsUseCase } from "@/domain/app/use-cases/discover-movies-and-shows"

export function makeDiscoverMoviesAndShowsUseCase() {
  const moviesRepository = new TmdbMoviesRepository()
  const tvShowsRepository = new TmdbTvShowsRepository()
  const useCase = new DiscoverMoviesAndShowsUseCase(
    moviesRepository,
    tvShowsRepository
  )

  return useCase
}
