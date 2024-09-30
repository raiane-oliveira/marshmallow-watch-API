import { type Either, left, right } from "@/core/errors/either"
import { InvalidUsernameError } from "@/core/errors/invalid-username-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { User } from "@/domain/app/entities/user"
import { Username } from "@/domain/app/entities/value-objects/username"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface EditUserUseCaseRequest {
  userId: string
  name: string
  username: string
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | InvalidUsernameError,
  {
    user: User
  }
>

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    username,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (!Username.isValid(username)) {
      return left(new InvalidUsernameError())
    }

    user.name = name
    user.username = Username.create(username)

    await this.usersRepository.update(user)

    return right({
      user,
    })
  }
}
