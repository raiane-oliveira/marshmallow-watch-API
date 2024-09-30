import type { TvShow } from "@/domain/app/entities/tv-show"
import type {
  TvShowParamsFilters,
  TvShowsRepository,
} from "@/domain/app/repositories/tv-shows-repository"

export class InMemoryTvShowsRepository implements TvShowsRepository {
  items: TvShow[] = []

  async findManyByRelease({ page }: TvShowParamsFilters) {
    const tvShows = this.items.slice((page - 1) * 20, page * 20)

    return tvShows
  }
}
