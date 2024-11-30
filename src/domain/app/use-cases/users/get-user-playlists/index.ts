import type { PlaylistDTO } from "@/core/dtos/playlist"
import { type Either, left, right } from "@/core/errors/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { Visibility } from "@/core/types/utils"
import type {
  FindManyPlaylistsParams,
  PlaylistsRepository,
} from "@/domain/app/repositories/playlists-repository"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface GetUserPlaylistsRequest
  extends Omit<FindManyPlaylistsParams, "with"> {
  username: string
  with: ("all" | Visibility | string)[]
}

type GetUserPlaylistsResponse = Either<
  ResourceNotFoundError,
  {
    defaultPlaylists: PlaylistDTO[]
    playlists: PlaylistDTO[]
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

    const { playlists, defaultPlaylists } =
      await this.playlistsRepository.findManyByUserId(user.id.toString(), {
        page: params.page,
        with: params.with.includes("all")
          ? ["public", "private"]
          : (params.with as Visibility[]),
      })

    return right({
      playlists,
      defaultPlaylists,
    })
  }
}
