import { Either, left, right } from "@/core/errors/either"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"
import { User } from "../../entities/user"
import { UsersRepository } from "../../repositories/users-repository"
import { HashCompare } from "../../cryptography/hash-compare"

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
