import { right, type Either } from "@/core/errors/either"
import type { TvShow } from "@/domain/app/entities/tv-show"
import type {
  TvShowSearchParams,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"

interface SearchTvShowsUseCaseRequest extends TvShowSearchParams { }

type SearchTvShowsUseCaseResponse = Either<
  null,
  {
    tvShows: TvShow[]
  }
>

export class SearchTvShowsUseCase {
  constructor(private tvShowsRepository: TvShowsRepository) { }

  async execute({
    page,
    query,
    firstAirDateYear,
  }: SearchTvShowsUseCaseRequest): Promise<SearchTvShowsUseCaseResponse> {
    const tvShows = await this.tvShowsRepository.search({
      query,
      page,
      firstAirDateYear,
    })

    return right({
      tvShows,
    })
  }
}
