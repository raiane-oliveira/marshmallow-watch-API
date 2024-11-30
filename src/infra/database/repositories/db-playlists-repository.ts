import type { Playlist } from "@/domain/app/entities/playlist"
import type {
  FindManyPlaylistsParams,
  PlaylistsRepository,
} from "@/domain/app/repositories/playlists-repository"
import { and, eq, inArray, sql } from "drizzle-orm"
import { db } from ".."
import { DbPlaylistsMapper } from "../mappers/db-playlists-mapper"
import { playlists, tmdbMediasInPlaylists } from "../schema"
import { DbPlaylistWithMediasMapper } from "../mappers/db-playlist-with-medias-mapper"

export class DbPlaylistsRepository implements PlaylistsRepository {
  async create(playlist: Playlist): Promise<Playlist> {
    const data = DbPlaylistsMapper.toDatabase(playlist)
    await db.insert(playlists).values(data)

    return playlist
  }

  async updateMediasId(playlistId: string, mediasId: string[]) {
    const insertMediasQueries = mediasId.map(mediaId => {
      return db.insert(tmdbMediasInPlaylists).values({
        tmdbMediaId: Number(mediaId),
        playlistId,
      })
    })

    await Promise.all(insertMediasQueries)
  }

  async findById(id: string): Promise<null | Playlist> {
    const playlistWithMedias = await db
      .select({
        id: playlists.id,
        name: playlists.name,
        visibility: playlists.visibility,
        mediasId: sql<string[]>`
          JSON_AGG(${tmdbMediasInPlaylists.tmdbMediaId})
        `,
        isDefault: playlists.isDefault,
        color: playlists.color,
        userId: playlists.userId,
        createdAt: playlists.createdAt,
        updatedAt: playlists.updatedAt,
      })
      .from(playlists)
      .leftJoin(
        tmdbMediasInPlaylists,
        eq(playlists.id, tmdbMediasInPlaylists.playlistId)
      )
      .groupBy(playlists.id)
      .having(eq(playlists.id, id))

    if (playlistWithMedias.length <= 0) {
      return null
    }

    return DbPlaylistWithMediasMapper.toDomain(playlistWithMedias[0])
  }

  async findManyByUserId(
    userId: string,
    { page, with: withVisibility }: FindManyPlaylistsParams
  ) {
    const filterPlaylists = and(
      eq(playlists.userId, userId),
      inArray(playlists.visibility, withVisibility),
      eq(playlists.isDefault, false)
    )
    const filterDefaultPlaylists = and(
      eq(playlists.userId, userId),
      inArray(playlists.visibility, withVisibility),
      eq(playlists.isDefault, true)
    )

    const selectFromPlaylist = {
      id: playlists.id,
      name: playlists.name,
      visibility: playlists.visibility,
      mediasId: sql<string[]>`
          JSON_AGG(${tmdbMediasInPlaylists.tmdbMediaId})
        `,
      isDefault: playlists.isDefault,
      color: playlists.color,
      userId: playlists.userId,
      createdAt: playlists.createdAt,
      updatedAt: playlists.updatedAt,
    }

    const [userPlaylists, defaultPlaylists] = await Promise.all([
      db
        .select(selectFromPlaylist)
        .from(playlists)
        .leftJoin(
          tmdbMediasInPlaylists,
          eq(playlists.id, tmdbMediasInPlaylists.playlistId)
        )
        .groupBy(playlists.id)
        .having(filterPlaylists)
        .offset((page - 1) * 20)
        .limit(page * 20),
      db
        .select(selectFromPlaylist)
        .from(playlists)
        .leftJoin(
          tmdbMediasInPlaylists,
          eq(playlists.id, tmdbMediasInPlaylists.playlistId)
        )
        .groupBy(playlists.id)
        .having(filterDefaultPlaylists)
        .offset((page - 1) * 20)
        .limit(page * 20),
    ])

    return {
      playlists: userPlaylists,
      defaultPlaylists,
    }
  }
}
