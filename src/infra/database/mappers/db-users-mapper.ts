import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { User } from "@/domain/app/entities/user"
import { VerificationToken } from "@/domain/app/entities/value-objects/verification-token"
import type { InsertUser, SelectUser } from "../schema"
import { Username } from "@/domain/app/entities/value-objects/username"

export class DbUsersMapper {
  static toDomain(raw: SelectUser) {
    const data = User.create(
      {
        name: raw.name,
        username: new Username(raw.username),
        email: raw.email,
        password: raw.password,
        avatarUrl: raw.avatarUrlId,
        verificationToken: new VerificationToken(raw.verificationToken),
        createdAt: new Date(raw.createdAt),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
      },
      new UniqueEntityId(raw.id)
    )

    return data
  }

  static toDatabase(raw: User) {
    const data: InsertUser = {
      id: raw.id.toString(),
      name: raw.name,
      username: raw.username.toString(),
      email: raw.email,
      password: raw.password,
      avatarUrlId: raw.avatarUrl,
      verificationToken: raw.verificationToken?.toString(),
    }

    return data
  }
}
