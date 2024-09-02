import { Either, left, right } from "@/core/errors/either"
import { UsersRepository } from "../../repositories/users-repository"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"

interface VerifyAccountTokenRequest {
  userId: string
  token: string
}

type VerifyAccountTokenResponse = Either<InvalidCredentialsError, boolean>

export class VerifyAccountTokenUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId, token }: VerifyAccountTokenRequest): Promise<VerifyAccountTokenResponse> {
    const user = await this.usersRepository.findById(userId)

    if (user?.verificationToken?.toString() !== token) {
      return left(new InvalidCredentialsError())
    }

    user.verificationToken = null
    await this.usersRepository.update(user)

    return right(true)
  }
}