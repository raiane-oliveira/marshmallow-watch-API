import type { Genre } from "@/domain/app/entities/genre"

export class GenrePresenter {
  static toHTTP(genre: Genre) {
    return {
      id: genre.id.toString(),
      name: genre.name,
    }
  }
}
