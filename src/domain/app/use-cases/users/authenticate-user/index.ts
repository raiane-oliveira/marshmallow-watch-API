import { Either, left, right } from "@/core/errors/either"
import { HashCompare } from "@/domain/app/cryptography/hash-compare"
import { User } from "@/domain/app/entities/user"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import { UsersRepository } from "@/domain/app/repositories/users-repository"

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<InvalidCredentialsError, {
  user: User
}>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashCompare: HashCompare,
  ) { }

  async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const doesPasswordMatches = await this.hashCompare.compare(password, user.password)

    if (!doesPasswordMatches) {
      return left(new InvalidCredentialsError())
    }

    return right({
      user,
    })
  }
}
