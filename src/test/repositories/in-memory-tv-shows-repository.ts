import type { TvShow } from "@/domain/app/entities/tv-show"
import type {
  TvShowParamsFilters,
  TvShowsRepository,
  TvShowSearchParams,
} from "@/domain/app/repositories/tv-shows-repository"

export class InMemoryTvShowsRepository implements TvShowsRepository {
  items: TvShow[] = []

  async findManyByRelease({ page }: TvShowParamsFilters) {
    const tvShows = this.items.slice((page - 1) * 20, page * 20)

    return tvShows
  }

  async search({ query, firstAirDateYear, page }: TvShowSearchParams) {
    const tvShowsByPage = this.items.slice((page - 1) * 20, page * 20)
    const tvShows = tvShowsByPage.filter(tvShow => {
      const isSameYear = !firstAirDateYear
        ? true
        : firstAirDateYear === tvShow.firstAirDate.getFullYear()

      return tvShow.title.includes(query) && isSameYear
    })

    return tvShows
  }
}
