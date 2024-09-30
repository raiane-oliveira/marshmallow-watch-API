import { GetUserProfileUseCase } from "@/domain/app/use-cases/users/get-user-profile"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeGetUserProfileUseCase() {
  const repository = new DbUsersRepository()
  const useCase = new GetUserProfileUseCase(repository)

  return useCase
}
