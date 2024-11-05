import { right, type Either } from "@/core/errors/either"
import type { Media } from "../../entities/media"
import type {
  MediasRepository,
  MediasTrendingParams,
} from "../../repositories/medias-repository"

interface DiscoverMoviesAndShowsUseCaseRequest extends MediasTrendingParams {}

type DiscoverMoviesAndShowsUseCaseResponse = Either<
  null,
  {
    medias: Media[]
  }
>

export class DiscoverMoviesAndShowsUseCase {
  constructor(private mediasRepository: MediasRepository) {}

  async execute(
    props: DiscoverMoviesAndShowsUseCaseRequest
  ): Promise<DiscoverMoviesAndShowsUseCaseResponse> {
    const medias = await this.mediasRepository.findManyByTrending(props)

    return right({
      medias,
    })
  }
}
