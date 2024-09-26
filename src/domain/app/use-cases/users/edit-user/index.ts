import { Either, left, right } from "@/core/errors/either"
import { User } from "../../entities/user"
import { UsersRepository } from "../../repositories/users-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface EditUserUseCaseRequest {
  userId: string
  name: string
}

type EditUserUseCaseResponse = Either<ResourceNotFoundError, {
  user: User
}>

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId, name }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.name = name

    await this.usersRepository.update(user)

    return right({
      user,
    })
  }
}
