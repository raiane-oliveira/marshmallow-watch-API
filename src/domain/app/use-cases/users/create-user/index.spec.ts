import { UserAlreadyExistsError } from "@/domain/app/errors/user-already-exists-error"
import { FakeHasher } from "@/test/cryptography/fake-hasher"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { CreateUserUseCase } from "."
import { InvalidUsernameError } from "@/core/errors/invalid-username-error"

const fakeHasher = new FakeHasher()

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe("Create User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository, fakeHasher)
  })

  it("should be able to create an user", async () => {
    const result = await sut.execute({
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(result.isRight()).toBe(true)
    expect(usersRepository.items).toHaveLength(1)

    if (result.isRight()) {
      expect(result.value.user).toEqual(
        expect.objectContaining({
          name: "John Doe",
          email: "johndoe@example.com",
        })
      )
    }
  })

  it("should not be able to create a user with same email", async () => {
    await sut.execute({
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "123456",
    })

    const result = await sut.execute({
      name: "John Doe 2",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(result.isLeft()).toBe(true)
    expect(usersRepository.items).toHaveLength(1)

    if (result.isLeft()) {
      expect(result.value.constructor).toBe(UserAlreadyExistsError)
    }
  })

  it("should hash user password", async () => {
    const result = await sut.execute({
      name: "John doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(result.isRight()).toEqual(true)

    if (result.isRight()) {
      expect(usersRepository.items[0].password).toEqual("123456-hashed")
    }
  })

  it("should not be able to create an user with invalid username", async () => {
    const result = await sut.execute({
      name: "John Doe",
      username: "john doe23$_%",
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(result.isLeft()).toBe(true)
    expect(usersRepository.items).toHaveLength(0)

    if (result.isLeft()) {
      expect(result.value.constructor).toBe(InvalidUsernameError)
    }
  })
})
