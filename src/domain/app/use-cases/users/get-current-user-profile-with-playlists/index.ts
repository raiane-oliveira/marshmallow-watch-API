import { type Either, left, right } from "@/core/errors/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { UserWithPlaylists } from "@/domain/app/entities/value-objects/user-with-playlists"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface GetCurrentUserProfileWithPlaylistsUseCaseRequest {
  username: string
}

type GetCurrentUserProfileWithPlaylistsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: UserWithPlaylists
  }
>

export class GetCurrentUserProfileWithPlaylistsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
  }: GetCurrentUserProfileWithPlaylistsUseCaseRequest): Promise<GetCurrentUserProfileWithPlaylistsUseCaseResponse> {
    const user =
      await this.usersRepository.findByUsernameWithPlaylists(username)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user,
    })
  }
}
