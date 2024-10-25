import type { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"
import { db } from ".."
import { playlists } from "../schema"
import { DbPlaylistsMapper } from "../mappers/db-playlists-mapper"

export class DbPlaylistsRepository implements PlaylistsRepository {
  async create(playlist: Playlist): Promise<Playlist> {
    const data = DbPlaylistsMapper.toDatabase(playlist)
    await db.insert(playlists).values(data)

    return playlist
  }
}
