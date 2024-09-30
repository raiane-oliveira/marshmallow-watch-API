import { type Either, left, right } from "@/core/errors/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface VerifyAccountTokenRequest {
  userId: string
  token: string
}

type VerifyAccountTokenResponse = Either<
  ResourceNotFoundError | InvalidCredentialsError,
  boolean
>

export class VerifyAccountTokenUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId,
    token,
  }: VerifyAccountTokenRequest): Promise<VerifyAccountTokenResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (user.verificationToken?.toString() !== token) {
      return left(new InvalidCredentialsError())
    }

    user.verificationToken = null
    await this.usersRepository.update(user)

    return right(true)
  }
}
