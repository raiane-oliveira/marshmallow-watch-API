import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { User } from "@/domain/app/entities/user"
import { VerificationToken } from "@/domain/app/entities/value-objects/verification-token"
import type { UserDb } from "knex/types/tables"

export class DbUsersMapper {
  static toDomain(raw: UserDb) {
    const data = User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        avatarUrl: raw.avatar_url_id,
        verificationToken: new VerificationToken(raw.verification_token),
        createdAt: new Date(raw.created_at),
        updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
      },
      new UniqueEntityId(raw.id)
    )

    return data
  }

  static toDatabase(raw: User) {
    const data = {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
      avatar_url_id: raw.avatarUrl,
      verification_token: raw.verificationToken?.toString(),
    }

    return data
  }
}
