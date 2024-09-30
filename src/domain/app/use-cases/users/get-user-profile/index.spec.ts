import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { makeUser } from "@/test/factories/make-user"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { GetUserProfileUseCase } from "."

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("should be able to get all data from user profile", async () => {
    const user = makeUser()
    usersRepository.items.push(user)
    usersRepository.items.push(makeUser())

    const result = await sut.execute({
      username: user.username.toString(),
    })

    expect(result.isRight())

    if (result.isRight()) {
      expect(result.value.user).toEqual(
        expect.objectContaining({
          name: user.name,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        })
      )
    }
  })

  it("should not be able to get inexistent user profile", async () => {
    const result = await sut.execute({
      username: "inexistentusername",
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
