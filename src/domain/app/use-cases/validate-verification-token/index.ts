import { Either, left, right } from "@/core/errors/either"
import { UsersRepository } from "../../repositories/users-repository"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"

interface ValidateVerificationTokenRequest {
  userId: string
  token: string
}

type ValidateVerificationTokenResponse = Either<InvalidCredentialsError, boolean>

export class ValidateVerificationTokenUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId, token }: ValidateVerificationTokenRequest): Promise<ValidateVerificationTokenResponse> {
    const user = await this.usersRepository.findById(userId)

    if (user?.verificationToken?.toString() !== token) {
      return left(new InvalidCredentialsError())
    }

    user.verificationToken = null
    await this.usersRepository.update(user)

    return right(true)
  }
}
