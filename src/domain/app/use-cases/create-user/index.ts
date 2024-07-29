import { Either, left, right } from "@/core/errors/either"
import { UsersRepository } from "../../repositories/users-repository"
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error"
import { HashGenerator } from "../../cryptography/hash-generator"
import { User } from "../../entities/user"

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<UserAlreadyExistsError, {
  user: User
}>

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(userAlreadyExists.email))
    }

    const passwordHashed = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: passwordHashed,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
