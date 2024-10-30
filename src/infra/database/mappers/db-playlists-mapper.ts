import { Playlist } from "@/domain/app/entities/playlist"
import type { InsertPlaylist, SelectPlaylist } from "../schema"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

export class DbPlaylistsMapper {
  static toDatabase(raw: Playlist): InsertPlaylist {
    return {
      id: raw.id.toString(),
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt?.toString(),
      userId: raw.userId.toString(),
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
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
        userId: new UniqueEntityId(raw.userId),
        mediasId: raw.mediaIds,
      },
      new UniqueEntityId(raw.id)
    )
  }
}
