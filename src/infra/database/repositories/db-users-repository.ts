import { User } from "@/domain/app/entities/user"
import { UsersRepository } from "@/domain/app/repositories/users-repository"
import { database } from ".."
import { DbUsersMapper } from "../mappers/db-users-mapper"

export class DbUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await database("users").select("*").where({
      email,
    }).first()

    if (!user) {
      return null
    }

    return DbUsersMapper.toDomain(user)
  }

  async findById(id: string) {
    const user = await database("users").select("*").where({
      id,
    }).first()

    if (!user) {
      return null
    }

    return DbUsersMapper.toDomain(user)
  }

  async create(user: User) {
    const data = DbUsersMapper.toDatabase(user)

    await database.insert(data).into("users").returning("*")
  }

  async update(user: User) {
    const data = DbUsersMapper.toDatabase(user)

    await database.update(data).from("users").where({
      id: data.id,
    })
  }
}
