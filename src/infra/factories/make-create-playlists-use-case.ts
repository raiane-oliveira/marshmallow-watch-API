import { CreatePlaylistUseCase } from "@/domain/app/use-cases/playlists/create-playlist"
import { DbPlaylistsRepository } from "../database/repositories/db-playlists-repository"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeCreatePlaylistsUseCase() {
  const playlistsRepository = new DbPlaylistsRepository()
  const usersRepository = new DbUsersRepository()
  const useCase = new CreatePlaylistUseCase(
    playlistsRepository,
    usersRepository
  )

  return useCase
}
