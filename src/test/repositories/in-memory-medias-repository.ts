import type { Media } from "@/domain/app/entities/media"
import type {
  MediasRepository,
  MediasTrendingParams,
} from "@/domain/app/repositories/medias-repository"

export class InMemoryMediasRepository implements MediasRepository {
  items: Media[] = []

  async findManyByTrending(params: MediasTrendingParams): Promise<Media[]> {
    return this.items
  }
}
