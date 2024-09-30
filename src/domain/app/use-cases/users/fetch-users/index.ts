import { type Either, right } from "@/core/errors/either"
import type { User } from "@/domain/app/entities/user"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface FetchUsersUseCaseRequest {
  page: number
}

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ page })

    return right({
      users,
    })
  }
}
