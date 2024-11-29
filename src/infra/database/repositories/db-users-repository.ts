import type { PaginationParams } from "@/core/pagination-params"
import type { User } from "@/domain/app/entities/user"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"
import { eq } from "drizzle-orm"
import { db } from ".."
import { DbUsersMapper } from "../mappers/db-users-mapper"
import { playlists as playlistsTable, users } from "../schema"
import type { CreatePlaylistDTO } from "@/core/dtos/playlist"

export class DbUsersRepository implements UsersRepository {
  async findMany({ page }: PaginationParams) {
    const usersReturn = await db
      .select()
      .from(users)
      .offset((page - 1) * 20)
      .limit(page * 20)

    return usersReturn.map(DbUsersMapper.toDomain)
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

  async createWithPlaylists(user: User, playlists: CreatePlaylistDTO[]) {
    const dataUser = DbUsersMapper.toDatabase(user)

    await db.transaction(async tx => {
      await tx.insert(users).values(dataUser)
      await Promise.all(
        playlists.map(data => {
          return tx.insert(playlistsTable).values({
            ...data,
            createdAt: new Date(),
          })
        })
      )
    })
  }

  async update(user: User) {
    const data = DbUsersMapper.toDatabase(user)

    await db.update(users).set(data).where(eq(users.id, user.id.toString()))
  }
}
