import { right, type Either } from "@/core/errors/either"
import type { Genre } from "@/domain/app/entities/genre"
import type { GenresRepository } from "@/domain/app/repositories/genres-repository"
import type { Locale } from "@/i18n"

interface GetMovieGenresUseCaseRequest {
  lang?: Locale
}

type GetMovieGenresUseCaseResponse = Either<
  null,
  {
    genres: Genre[]
  }
>

export class GetMovieGenresUseCase {
  constructor(private genresRepository: GenresRepository) {}

  async execute({
    lang = "en",
  }: GetMovieGenresUseCaseRequest): Promise<GetMovieGenresUseCaseResponse> {
    const genres = await this.genresRepository.findManyFromMovies({ lang })

    return right({
      genres,
    })
  }
}
