import { FetchTopRatedShowsUseCase } from "@/domain/app/use-cases/tv-shows/fetch-top-rated-shows"
import { TmdbTvShowsRepository } from "../third-apis/repositories/tmdb-tv-shows-repository"

export function makeTopRatedTvShowsUseCase() {
  const repository = new TmdbTvShowsRepository()
  const useCase = new FetchTopRatedShowsUseCase(repository)

  return useCase
}
