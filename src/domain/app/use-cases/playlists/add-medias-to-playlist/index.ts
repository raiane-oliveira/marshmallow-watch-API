import { type Either, left, right } from "@/core/errors/either"
import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"

interface AddMediasToPlaylistUseCaseRequest {
  mediasId: string[]
  playlistId: string
  userId: string
}

type AddMediasToPlaylistUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    playlist: Playlist
  }
>

export class AddMediasToPlaylistUseCase {
  constructor(private playlistsRepository: PlaylistsRepository) {}

  async execute({
    mediasId,
    playlistId,
    userId,
  }: AddMediasToPlaylistUseCaseRequest): Promise<AddMediasToPlaylistUseCaseResponse> {
    const playlist = await this.playlistsRepository.findById(playlistId)

    if (!playlist) {
      return left(new ResourceNotFoundError())
    }

    if (playlist.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.playlistsRepository.updateMediasId(
      playlist.id.toString(),
      mediasId
    )

    return right({
      playlist,
    })
  }
}
