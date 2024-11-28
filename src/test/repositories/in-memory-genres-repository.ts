import type { Genre } from "@/domain/app/entities/genre"
import type {
  GenresRepository,
  GenresSearchParams,
} from "@/domain/app/repositories/genres-repository"

export class InMemoryGenresRepository implements GenresRepository {
  items: Genre[] = []

  async findManyFromMovies(_params: GenresSearchParams): Promise<Genre[]> {
    return this.items
  }

  async findManyFromShows(_params: GenresSearchParams): Promise<Genre[]> {
    return this.items
  }
}
