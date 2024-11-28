import { GetMovieGenresUseCase } from "@/domain/app/use-cases/genres/get-movie-genres"
import { TmdbGenresRepository } from "../third-apis/repositories/tmdb-genres-repository"

export function makeGetMovieGenreUseCase() {
  const repository = new TmdbGenresRepository()
  const useCase = new GetMovieGenresUseCase(repository)

  return useCase
}
