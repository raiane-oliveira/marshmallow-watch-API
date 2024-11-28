import { right, type Either } from "@/core/errors/either"
import type { Genre } from "@/domain/app/entities/genre"
import type { GenresRepository } from "@/domain/app/repositories/genres-repository"
import type { Locale } from "@/i18n"

interface GetShowGenresUseCaseRequest {
  lang?: Locale
}

type GetShowGenresUseCaseResponse = Either<
  null,
  {
    genres: Genre[]
  }
>

export class GetShowGenresUseCase {
  constructor(private genresRepository: GenresRepository) {}

  async execute({
    lang = "en",
  }: GetShowGenresUseCaseRequest): Promise<GetShowGenresUseCaseResponse> {
    const genres = await this.genresRepository.findManyFromShows({ lang })

    return right({
      genres,
    })
  }
}
