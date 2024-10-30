import type { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"
import { eq, sql } from "drizzle-orm"
import { db } from ".."
import { DbPlaylistsMapper } from "../mappers/db-playlists-mapper"
import { playlists, tmdbMediasInPlaylists } from "../schema"

export class DbPlaylistsRepository implements PlaylistsRepository {
  async create(playlist: Playlist): Promise<Playlist> {
    const data = DbPlaylistsMapper.toDatabase(playlist)
    await db.insert(playlists).values(data)

    return playlist
  }

  async updateMediasId(playlist: Playlist): Promise<Playlist> {
    const playlistId = playlist.id.toString()
    const mediasData = playlist.mediasId

    const insertMediasQueries = mediasData.map(mediaId => {
      return db.insert(tmdbMediasInPlaylists).values({
        tmdbMediaId: Number(mediaId),
        playlistId,
      })
    })

    await Promise.all(insertMediasQueries)

    return playlist
  }

  async findById(id: string): Promise<null | Playlist> {
    const playlistWithMedias = await db
      .select({
        id: playlists.id,
        name: playlists.name,
        userId: playlists.userId,
        createdAt: playlists.createdAt,
        updatedAt: playlists.updatedAt,
        mediaIds: sql<string[]>`
          JSON_AGG(${tmdbMediasInPlaylists.tmdbMediaId})
        `,
      })
      .from(playlists)
      .innerJoin(
        tmdbMediasInPlaylists,
        eq(playlists.id, tmdbMediasInPlaylists.playlistId)
      )
      .groupBy(playlists.id)
      .having(eq(playlists.id, id))

    if (playlistWithMedias.length <= 0) {
      return null
    }

    return DbPlaylistsMapper.toDomain(playlistWithMedias[0])
  }
}
