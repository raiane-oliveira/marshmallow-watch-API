import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { User } from "@/domain/app/entities/user"
import { UserDb } from "knex/types/tables"

export class DbUsersMapper {
  static toDomain(raw: UserDb) {
    const data = User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      avatarUrl: raw.avatar_url_id,
      createdAt: new Date(raw.created_at),
      updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
    }, new UniqueEntityId(raw.id))

    return data
  }

  static toDatabase(raw: User) {
    const data = {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
      avatar_url_id: raw.avatarUrl,
    }

    return data
  }
}
