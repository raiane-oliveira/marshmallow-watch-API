import type { Playlist } from "@/domain/app/entities/playlist"
import type { InsertPlaylist } from "../schema"

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
}
