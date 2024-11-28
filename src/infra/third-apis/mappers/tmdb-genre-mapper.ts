import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Genre } from "@/domain/app/entities/genre"
import type { TmdbGenre } from "../interfaces/tmdb-genre"

export class TmdbGenresMapper {
  static toDomain(raw: TmdbGenre) {
    const data = Genre.create(
      {
        name: raw.name,
      },
      new UniqueEntityId(raw.id.toString())
    )

    return data
  }
}
