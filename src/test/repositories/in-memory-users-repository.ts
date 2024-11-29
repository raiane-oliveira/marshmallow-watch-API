import type { PaginationParams } from "@/core/pagination-params"
import { Playlist } from "@/domain/app/entities/playlist"
import type { User } from "@/domain/app/entities/user"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"
import type { InMemoryPlaylistsRepository } from "./in-memory-playlists-repository"
import type { CreatePlaylistDTO } from "@/core/dtos/playlist"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

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

  async createWithPlaylists(user: User, playlists: CreatePlaylistDTO[]) {
    this.items.push(user)
    const playlistsEntity = playlists.map(playlist =>
      Playlist.create({
        ...playlist,
        userId: new UniqueEntityId(playlist.userId),
        mediasId: [],
      })
    )

    this.playlistsRepository?.items.push(...playlistsEntity)
  }

  async update(user: User) {
    const userIndex = this.items.findIndex(
      item => item.id.toString() === user.id.toString()
    )

    this.items[userIndex] = user
  }
}
