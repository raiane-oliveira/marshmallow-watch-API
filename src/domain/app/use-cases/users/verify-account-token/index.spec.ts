import { VerificationToken } from "@/domain/app/entities/value-objects/verification-token"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import { makeUser } from "@/test/factories/make-user"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { VerifyAccountTokenUseCase } from "."

let usersRepository: InMemoryUsersRepository
let sut: VerifyAccountTokenUseCase

describe("Verify account token use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new VerifyAccountTokenUseCase(usersRepository)
  })

  it("should be able to validate token", async () => {
    const user = makeUser()

    usersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      token: user.verificationToken?.toString(),
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
