import { AddMoviesToPlaylistUseCase } from "@/domain/app/use-cases/playlists/add-movies-to-playlist"
import { DbPlaylistsRepository } from "../database/repositories/db-playlists-repository"

export function makeAddMoviesToPlaylistsUseCase() {
  const playlistsRepository = new DbPlaylistsRepository()
  const useCase = new AddMoviesToPlaylistUseCase(playlistsRepository)

  return useCase
}
