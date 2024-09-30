import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { TvShow } from "@/domain/app/entities/tv-show"
import type { TmdbTvShow } from "../interfaces/tmdb-tv-show"

export class TmdbTvShowsMapper {
  static toDomain(raw: TmdbTvShow) {
    const data = TvShow.create(
      {
        title: raw.name,
        description: raw.overview,
        genreIds: raw.genre_ids.map(
          genre => new UniqueEntityId(genre.toString())
        ),
        imagePath: raw.poster_path,
        firstAirDate: new Date(raw.first_air_date),
      },
      new UniqueEntityId(raw.id.toString())
    )

    return data
  }
}
