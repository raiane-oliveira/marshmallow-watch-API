import type { Movie } from "@/domain/app/entities/movie"
import type {
  MovieParamsFilters,
  MovieSearchParams,
  MoviesRepository,
} from "@/domain/app/repositories/movies-repository"

export class InMemoryMoviesRepository implements MoviesRepository {
  items: Movie[] = []

  async findManyByRelease({ page }: MovieParamsFilters) {
    const movies = this.items.slice((page - 1) * 20, page * 20)

    return movies
  }

  async search({ query, year, page }: MovieSearchParams) {
    const moviesByPage = this.items.slice((page - 1) * 20, page * 20)
    const movies = moviesByPage.filter(movie => {
      const isSameYear = !year ? true : year === movie.releaseAt?.getFullYear()

      return movie.title.includes(query) && isSameYear
    })

    return movies
  }
}
