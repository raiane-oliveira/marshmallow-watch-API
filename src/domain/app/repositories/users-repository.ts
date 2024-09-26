import type { User } from "../entities/user"

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(user: User): Promise<void>
  update(user: User): Promise<void>
}
