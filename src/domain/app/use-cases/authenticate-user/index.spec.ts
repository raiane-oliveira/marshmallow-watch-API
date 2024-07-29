import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { AuthenticateUserUseCase } from "."
import { FakeHasher } from "@/test/cryptography/fake-hasher"
import { makeUser } from "@/test/factories/make-user"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"

const fakeHasher = new FakeHasher()

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository, fakeHasher)
  })

  it("should be able to authenticate the user", async () => {
    usersRepository.create(makeUser({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
    }))

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.user).toEqual(expect.objectContaining({
        name: "John Doe",
        email: "johndoe@example.com",
      }))
    }
  })

  it("should not be able to authenticate a user with wrong email", async () => {
    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.constructor).toBe(InvalidCredentialsError)
    }
  })

  it("should not be able to authenticate a user with wrong password", async () => {
    usersRepository.create(makeUser({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
    }))

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "1234567",
    })

    expect(result.isLeft()).toEqual(true)

    if (result.isLeft()) {
      expect(result.value.constructor).toBe(InvalidCredentialsError)
    }
  })
})
