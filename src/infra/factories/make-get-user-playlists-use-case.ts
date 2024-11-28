import { GetUserPlaylistsUseCase } from "@/domain/app/use-cases/users/get-user-playlists"
import { DbUsersRepository } from "../database/repositories/db-users-repository"
import { GetCurrentUserProfileWithPlaylistsUseCase } from "@/domain/app/use-cases/users/get-current-user-profile-with-playlists"
import { DbPlaylistsRepository } from "../database/repositories/db-playlists-repository"

export function makeGetUserPlaylistsUseCase() {
  const usersRepository = new DbUsersRepository()
  const playlistsRepository = new DbPlaylistsRepository()
  const useCase = new GetUserPlaylistsUseCase(
    usersRepository,
    playlistsRepository
  )

  return useCase
}
