import type { PaginationParams } from "@/core/pagination-params"
import type { Playlist } from "@/domain/app/entities/playlist"
import type { User } from "@/domain/app/entities/user"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"
import { eq, sql } from "drizzle-orm"
import { db } from ".."
import { DbPlaylistsMapper } from "../mappers/db-playlists-mapper"
import { DbUserWithPlaylistsMapper } from "../mappers/db-user-with-playlists-mapper"
import { DbUsersMapper } from "../mappers/db-users-mapper"
import {
  type SelectPlaylist,
  playlists,
  playlists as playlistsTable,
  tmdbMediasInPlaylists,
  users,
} from "../schema"

export class DbUsersRepository implements UsersRepository {
  async findMany({ page }: PaginationParams) {
    const usersReturn = await db
      .select()
      .from(users)
      .offset((page - 1) * 20)
      .limit(page * 20)

    return usersReturn.map(DbUsersMapper.toDomain)
  }

  async findByUsernameWithPlaylists(username: string) {
    const userPlaylistsWithMedias = db.$with("user_playlists_with_medias").as(
      db
        .select({
          id: playlists.id,
          name: playlists.name,
          visibility: playlists.visibility,
          mediaIds: sql<string[]>`
          JSON_AGG(${tmdbMediasInPlaylists.tmdbMediaId}) AS "mediaIds"
        `,
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
        .limit(20)
    )

    const userWithPlaylists = await db
      .with(userPlaylistsWithMedias)
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        avatarUrlId: users.avatarUrlId,
        playlists: sql<
          (SelectPlaylist & {
            mediaIds: string[]
          })[]
        >`
           JSON_AGG(${userPlaylistsWithMedias})
        `,
      })
      .from(users)
      .innerJoin(
        userPlaylistsWithMedias,
        eq(userPlaylistsWithMedias.userId, users.id)
      )
      .groupBy(users.id)
      .having(eq(users.username, username))

    if (!userWithPlaylists[0]) {
      return null
    }

    return DbUserWithPlaylistsMapper.toDomain(userWithPlaylists[0])
  }

  async findByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email))

    if (!user[0]) {
      return null
    }

    return DbUsersMapper.toDomain(user[0])
  }

  async findById(id: string) {
    const user = await db.select().from(users).where(eq(users.id, id))

    if (!user[0]) {
      return null
    }

    return DbUsersMapper.toDomain(user[0])
  }

  async findByUsername(username: string) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))

    if (!user[0]) {
      return null
    }

    return DbUsersMapper.toDomain(user[0])
  }

  async create(user: User) {
    const data = DbUsersMapper.toDatabase(user)

    await db.insert(users).values(data)
  }

  async createWithPlaylists(user: User, playlists: Playlist[]) {
    const dataUser = DbUsersMapper.toDatabase(user)
    const dataPlaylists = playlists.map(DbPlaylistsMapper.toDatabase)

    await db.transaction(async tx => {
      await tx.insert(users).values(dataUser)
      await Promise.all(
        dataPlaylists.map(data => {
          return tx.insert(playlistsTable).values(data)
        })
      )
    })
  }

  async update(user: User) {
    const data = DbUsersMapper.toDatabase(user)

    await db.update(users).set(data).where(eq(users.id, user.id.toString()))
  }
}
