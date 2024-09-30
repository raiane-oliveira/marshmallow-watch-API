import { FetchUsersUseCase } from "@/domain/app/use-cases/users/fetch-users"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeFetchUsersUseCase() {
  const repository = new DbUsersRepository()
  const useCase = new FetchUsersUseCase(repository)

  return useCase
}
