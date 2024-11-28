import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Playlist } from "@/domain/app/entities/playlist"
import type { InsertPlaylist, SelectPlaylist } from "../schema"

export class DbPlaylistWithMediasMapper {
  static toDatabase(raw: Playlist): InsertPlaylist {
    return {
      id: raw.id.toString(),
      name: raw.name,
      visibility: raw.visibility,
      userId: raw.userId.toString(),
      color: raw.color,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt?.toString(),
    }
  }

  static toDomain(
    raw: SelectPlaylist & {
      mediaIds: string[]
    }
  ): Playlist {
    return Playlist.create(
      {
        name: raw.name,
        visibility: raw.visibility,
        userId: new UniqueEntityId(raw.userId),
        mediasId: raw.mediaIds,
        color: raw.color,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
      },
      new UniqueEntityId(raw.id)
    )
  }
}
