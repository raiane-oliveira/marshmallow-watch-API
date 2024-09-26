import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { User, type UserProps } from "@/domain/app/entities/user"
import { VerificationToken } from "@/domain/app/entities/value-objects/verification-token"
import { faker } from "@faker-js/faker"

export function makeUser(override?: Partial<UserProps>, id?: UniqueEntityId) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email({
        provider: "test.dev",
      }),
      password: faker.internet.password(),
      avatarUrl: faker.internet.url(),
      verificationToken: new VerificationToken(),
      ...override,
    },
    id
  )

  return user
}
