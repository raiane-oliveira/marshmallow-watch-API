import { DbUsersRepository } from "../database/repositories/db-users-repository"
import { GetCurrentUserProfileWithPlaylistsUseCase } from "@/domain/app/use-cases/users/get-current-user-profile-with-playlists"

export function makeGetUserProfileWithPlaylistsUseCase() {
  const repository = new DbUsersRepository()
  const useCase = new GetCurrentUserProfileWithPlaylistsUseCase(repository)

  return useCase
}
