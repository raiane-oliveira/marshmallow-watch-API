import type { PaginationParams } from "@/core/pagination-params"
import type { User } from "../entities/user"
import type { CreatePlaylistDTO } from "@/core/dtos/playlist"

export interface UsersRepository {
  findMany(params: PaginationParams): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(user: User): Promise<void>
  createWithPlaylists(user: User, playlists: CreatePlaylistDTO[]): Promise<void>
  update(user: User): Promise<void>
}
