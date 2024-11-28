import { type Either, right } from "@/core/errors/either"
import type { TvShow } from "@/domain/app/entities/tv-show"
import type {
  TvShowParamsFilters,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"

interface DiscoverTvShowsUseCaseRequest extends TvShowParamsFilters {}

type DiscoverTvShowsUseCaseResponse = Either<
  null,
  {
    tvShows: TvShow[]
  }
>

export class DiscoverTvShowsUseCase {
  constructor(private tvShowsRepository: TvShowsRepository) {}

  async execute({
    page,
    sortBy,
    lang,
    ...params
  }: DiscoverTvShowsUseCaseRequest): Promise<DiscoverTvShowsUseCaseResponse> {
    const tvShows = await this.tvShowsRepository.findManyByFilter({
      page,
      sortBy,
      lang,
      ...params,
    })

    return right({
      tvShows,
    })
  }
}
