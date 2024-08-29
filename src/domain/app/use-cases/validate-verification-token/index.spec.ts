import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { ValidateVerificationTokenUseCase } from "."
import { makeUser } from "@/test/factories/make-user"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"
import { VerificationToken } from "../../entities/value-objects/verification-token"

let usersRepository: InMemoryUsersRepository
let sut: ValidateVerificationTokenUseCase

describe("Validate verification token", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ValidateVerificationTokenUseCase(usersRepository)
  })

  it("should be able to validate token", async () => {
    const user = makeUser()

    usersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      token: user.verificationToken!.toString(),
    })

    if (result.isRight()) {
      expect(result.value).toBeTruthy()

      const userDb = await usersRepository.findById(user.id.toString())
      expect(userDb?.verificationToken).toBeNull()
    }
  })

  it("should not be able to validate incorrect token", async () => {
    const user = makeUser()

    usersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      token: "12345",
    })

    expect(result.value).toBeInstanceOf(InvalidCredentialsError)

    const userDb = await usersRepository.findById(user.id.toString())
    expect(userDb?.verificationToken).toBeInstanceOf(VerificationToken)
  })
})
