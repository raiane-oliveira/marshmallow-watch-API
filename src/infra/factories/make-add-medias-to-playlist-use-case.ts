import { AddMediasToPlaylistUseCase } from "@/domain/app/use-cases/playlists/add-medias-to-playlist"
import { DbPlaylistsRepository } from "../database/repositories/db-playlists-repository"

export function makeAddMediasToPlaylistsUseCase() {
  const playlistsRepository = new DbPlaylistsRepository()
  const useCase = new AddMediasToPlaylistUseCase(playlistsRepository)

  return useCase
}
