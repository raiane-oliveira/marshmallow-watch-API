import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Movie } from "@/domain/app/entities/movie"
import type { TmdbMovie } from "../interfaces/tmdb-movie"

export class TmdbMoviesMapper {
  static toDomain(raw: TmdbMovie) {
    const data = Movie.create(
      {
        title: raw.title,
        description: raw.overview,
        genreIds: raw.genre_ids.map(
          genre => new UniqueEntityId(genre.toString())
        ),
        imagePath: raw.poster_path,
        releaseAt: new Date(raw.release_date),
      },
      new UniqueEntityId(raw.id.toString())
    )

    return data
  }
}
