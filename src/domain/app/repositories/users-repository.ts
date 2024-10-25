import type { PaginationParams } from "@/core/pagination-params"
import type { User } from "../entities/user"
import type { Playlist } from "../entities/playlist"

export interface UsersRepository {
  findMany(params: PaginationParams): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(user: User): Promise<void>
  createWithPlaylists(user: User, playlists: Playlist[]): Promise<void>
  update(user: User): Promise<void>
}
