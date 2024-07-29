import { faker } from "@faker-js/faker"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { User, UserProps } from "@/domain/app/entities/user"

export function makeUser(override?: Partial<UserProps>, id?: UniqueEntityId) {
  const user = User.create({
    name: faker.person.fullName(),
    email: faker.internet.email({
      provider: "test.dev",
    }),
    password: faker.internet.password(),
    avatarUrl: faker.internet.url(),
    ...override,
  }, id)

  return user
}
