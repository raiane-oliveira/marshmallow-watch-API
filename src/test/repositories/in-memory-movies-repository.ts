import { Movie } from "@/domain/app/entities/movie"
import { MovieParamsFilters, MoviesRepository } from "@/domain/app/repositories/movies-repository"

export class InMemoryMoviesRepository implements MoviesRepository {
  items: Movie[] = []

  async findManyByRelease({ page }: MovieParamsFilters) {
    const movies = this.items.slice(((page - 1) * 20), page * 20)

    return movies
  }
}
