import { TmdbMoviesRepository } from "../third-apis/repositories/tmdb-movies-repository"
import { FetchUpcomingMoviesUseCase } from "@/domain/app/use-cases/movies/fetch-upcoming-movies"

export function makeFetchUpcomingMoviesUseCase() {
  const repository = new TmdbMoviesRepository()
  const useCase = new FetchUpcomingMoviesUseCase(repository)

  return useCase
}
