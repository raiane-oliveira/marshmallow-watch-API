import type { PaginationParams } from "@/core/pagination-params"
import type { Playlist } from "@/domain/app/entities/playlist"
import type { User } from "@/domain/app/entities/user"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"
import type { InMemoryPlaylistsRepository } from "./in-memory-playlists-repository"
import { UserWithPlaylists } from "@/domain/app/entities/value-objects/user-with-playlists"

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []

  constructor(private playlistsRepository?: InMemoryPlaylistsRepository) {}

  async findMany({ page }: PaginationParams) {
    const users = this.items.slice((page - 1) * 20, page * 20)

    return users
  }

  async findById(id: string) {
    const user = this.items.find(item => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByUsernameWithPlaylists(username: string) {
    const user = this.items.find(item => item.username.equals(username))

    if (!user) {
      return null
    }

    const playlists = this.playlistsRepository?.items.filter(
      playlist => playlist.userId.toString() === user.id.toString()
    )

    const userWithPlaylists = UserWithPlaylists.create({
      userId: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatarUrl: user.avatarUrl,
      verificationToken: user.verificationToken,
      playlists: playlists ?? [],
    })

    return userWithPlaylists
  }

  async findByUsername(username: string) {
    const user = this.items.find(item => item.username.equals(username))

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)
  }

  async createWithPlaylists(user: User, playlists: Playlist[]) {
    this.items.push(user)
    this.playlistsRepository?.items.push(...playlists)
  }

  async update(user: User) {
    const userIndex = this.items.findIndex(
      item => item.id.toString() === user.id.toString()
    )

    this.items[userIndex] = user
  }
}
