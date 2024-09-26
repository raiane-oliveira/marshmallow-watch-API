import { makeUser } from "@/test/factories/make-user"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { EditUserUseCase } from "."

let usersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe("Edit User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(usersRepository)
  })

  it("should be able to edit an user", async () => {
    const user = makeUser()
    usersRepository.create(user)

    expect(usersRepository.items[0].name).toEqual(user.name)

    const result = await sut.execute({
      userId: user.id.toString(),
      name: "John Doe",
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.user).toEqual(
        expect.objectContaining({
          name: "John Doe",
        })
      )
    }
  })
})
