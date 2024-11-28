import { type Either, left, right } from "@/core/errors/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { Playlist } from "@/domain/app/entities/playlist"
import type {
  FindManyPlaylistsParams,
  PlaylistsRepository,
} from "@/domain/app/repositories/playlists-repository"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface GetUserPlaylistsRequest extends FindManyPlaylistsParams {
  username: string
}

type GetUserPlaylistsResponse = Either<
  ResourceNotFoundError,
  {
    playlists: Playlist[]
  }
>

export class GetUserPlaylistsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private playlistsRepository: PlaylistsRepository
  ) {}

  async execute({
    username,
    ...params
  }: GetUserPlaylistsRequest): Promise<GetUserPlaylistsResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const playlists = await this.playlistsRepository.findManyByUserId(
      user.id.toString(),
      {
        page: params.page,
        with: params.with ?? ["all"],
      }
    )

    return right({
      playlists,
    })
  }
}
