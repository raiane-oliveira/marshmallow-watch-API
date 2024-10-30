import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { type Either, left, right } from "@/core/errors/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { Visibility } from "@/core/types/utils"
import { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface CreatePlaylistUseCaseRequest {
  name: string
  userId: string
  visibility: Visibility
}

type CreatePlaylistUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    playlist: Playlist
  }
>

export class CreatePlaylistUseCase {
  constructor(
    private playlistsRepository: PlaylistsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    userId,
    visibility,
  }: CreatePlaylistUseCaseRequest): Promise<CreatePlaylistUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const playlist = await this.playlistsRepository.create(
      Playlist.create({
        name,
        userId: new UniqueEntityId(userId),
        visibility,
        mediasId: [],
      })
    )

    return right({
      playlist,
    })
  }
}
