import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { makeUser } from "@/test/factories/make-user"
import { FetchUsersUseCase } from "."

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersUseCase

describe("Fetch Users Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersUseCase(usersRepository)
  })

  it("should be able to get users by page", async () => {
    for (let i = 0; i < 22; i++) {
      usersRepository.create(makeUser())
    }

    const result = await sut.execute({
      page: 1,
    })

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result2.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.users).toHaveLength(20)
    }

    if (result2.isRight()) {
      expect(result2.value.users).toHaveLength(2)
    }
  })
})
