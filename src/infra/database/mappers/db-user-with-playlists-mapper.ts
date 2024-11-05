import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Username } from "@/domain/app/entities/value-objects/username"
import type { SelectPlaylist } from "../schema"
import { UserWithPlaylists } from "@/domain/app/entities/value-objects/user-with-playlists"
import { DbPlaylistsMapper } from "./db-playlists-mapper"

interface DbUsersWithPlaylists {
  id: string
  name: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date | null
  avatarUrlId: string | null
  playlists: (SelectPlaylist & {
    mediaIds: string[]
  })[]
}

export class DbUserWithPlaylistsMapper {
  static toDomain(user: DbUsersWithPlaylists): UserWithPlaylists {
    const data = UserWithPlaylists.create({
      userId: new UniqueEntityId(user.id),
      name: user.name,
      username: new Username(user.username),
      email: user.email,
      avatarUrl: user.avatarUrlId,
      createdAt: new Date(user.createdAt),
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
      playlists: user.playlists.map(playlist => {
        return DbPlaylistsMapper.toDomain(playlist)
      }),
    })

    return data
  }
}
