import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { User, type UserProps } from "@/domain/app/entities/user"
import { Username } from "@/domain/app/entities/value-objects/username"
import { VerificationToken } from "@/domain/app/entities/value-objects/verification-token"
import { faker } from "@faker-js/faker"

export function makeUser(override?: Partial<UserProps>, id?: UniqueEntityId) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      username: new Username(faker.internet.userName()),
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
