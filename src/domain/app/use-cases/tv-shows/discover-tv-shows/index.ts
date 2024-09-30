import { type Either, right } from "@/core/errors/either"
import type { TvShow } from "@/domain/app/entities/tv-show"
import type {
  TvShowParamsFilters,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"

interface DiscoverTvShowsUseCaseRequest extends TvShowParamsFilters { }

type DiscoverTvShowsUseCaseResponse = Either<
  null,
  {
    tvShows: TvShow[]
  }
>

export class DiscoverTvShowsUseCase {
  constructor(private tvShowsRepository: TvShowsRepository) { }

  async execute({
    page,
    sortBy,
  }: DiscoverTvShowsUseCaseRequest): Promise<DiscoverTvShowsUseCaseResponse> {
    const tvShows = await this.tvShowsRepository.findManyByRelease({
      page,
      sortBy,
    })

    return right({
      tvShows,
    })
  }
}
