import { GetShowGenresUseCase } from "@/domain/app/use-cases/genres/get-shows-genres"
import { TmdbGenresRepository } from "../third-apis/repositories/tmdb-genres-repository"

export function makeGetShowGenreUseCase() {
  const repository = new TmdbGenresRepository()
  const useCase = new GetShowGenresUseCase(repository)

  return useCase
}
