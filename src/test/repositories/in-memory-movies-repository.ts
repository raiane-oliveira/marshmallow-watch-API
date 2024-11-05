import type { Movie } from "@/domain/app/entities/movie"
import type {
  MovieParamsFilters,
  MovieSearchParams,
  MoviesRepository,
  MovieUpcomingParams,
} from "@/domain/app/repositories/movies-repository"
import dayjs from "dayjs"

export class InMemoryMoviesRepository implements MoviesRepository {
  items: Movie[] = []

  async findManyByFilter({ page }: MovieParamsFilters) {
    const movies = this.items.slice((page - 1) * 20, page * 20)

    return movies
  }

  async findManyByUpcoming({ page }: MovieUpcomingParams) {
    const movies = this.items.slice((page - 1) * 20, page * 20)
    const upcomingMovies = movies.filter(movie =>
      dayjs(movie.releaseAt).isAfter(new Date())
    )

    return upcomingMovies
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
