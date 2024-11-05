import { type Either, right } from "@/core/errors/either"
import type { PaginationParams } from "@/core/pagination-params"
import type { TvShow } from "@/domain/app/entities/tv-show"
import type { TvShowsRepository } from "@/domain/app/repositories/tv-shows-repository"
import type { Locale } from "@/i18n"

interface FetchTopRatedShowsRequest extends PaginationParams {
  lang?: Locale | string
}

type FetchTopRatedShowsResponse = Either<
  null,
  {
    tvShows: TvShow[]
  }
>

export class FetchTopRatedShowsUseCase {
  constructor(private tvShowsRepository: TvShowsRepository) {}

  async execute({
    lang,
    page,
  }: FetchTopRatedShowsRequest): Promise<FetchTopRatedShowsResponse> {
    const tvShows = await this.tvShowsRepository.findManyByTopRated({
      page,
      lang,
    })

    return right({
      tvShows,
    })
  }
}
