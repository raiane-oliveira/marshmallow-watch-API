import { right, type Either } from "@/core/errors/either"
import type {
  MovieParamsFilters,
  MoviesRepository,
} from "../../repositories/movies-repository"
import type {
  TvShowParamsFilters,
  TvShowsRepository,
} from "../../repositories/tv-shows-repository"
import type { Media } from "../../entities/media"

interface DiscoverMoviesAndShowsUseCaseRequest
  extends MovieParamsFilters,
    TvShowParamsFilters {}

type DiscoverMoviesAndShowsUseCaseResponse = Either<
  null,
  {
    medias: Media[]
  }
>

export class DiscoverMoviesAndShowsUseCase {
  constructor(
    private moviesRepository: MoviesRepository,
    private tvShowsRepository: TvShowsRepository
  ) {}

  async execute(
    props: DiscoverMoviesAndShowsUseCaseRequest
  ): Promise<DiscoverMoviesAndShowsUseCaseResponse> {
    const [moviesRes, tvShowsRes] = await Promise.all([
      this.moviesRepository.findManyByFilter(props),
      this.tvShowsRepository.findManyByFilter(props),
    ])

    const medias: Media[] = new Array().concat(moviesRes).concat(tvShowsRes)
    medias.sort((a, b) => b.popularity - a.popularity)

    return right({
      medias,
    })
  }
}
