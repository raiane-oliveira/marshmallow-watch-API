import { type Either, left, right } from "@/core/errors/either"
import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"

interface AddMoviesToPlaylistUseCaseRequest {
  movieIds: string[]
  playlistId: string
  userId: string
}

type AddMoviesToPlaylistUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    playlist: Playlist
  }
>

export class AddMoviesToPlaylistUseCase {
  constructor(private playlistsRepository: PlaylistsRepository) {}

  async execute({
    movieIds,
    playlistId,
    userId,
  }: AddMoviesToPlaylistUseCaseRequest): Promise<AddMoviesToPlaylistUseCaseResponse> {
    const playlist = await this.playlistsRepository.findById(playlistId)

    if (!playlist) {
      return left(new ResourceNotFoundError())
    }

    if (playlist.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.playlistsRepository.updateMediasId(
      playlist.id.toString(),
      movieIds
    )

    return right({
      playlist,
    })
  }
}
