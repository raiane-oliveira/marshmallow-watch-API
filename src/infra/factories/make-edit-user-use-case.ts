import { DbUsersRepository } from "../database/repositories/db-users-repository"
import { EditUserUseCase } from "@/domain/app/use-cases/users/edit-user"

export function makeEditUserUseCase() {
  const repository = new DbUsersRepository()
  const useCase = new EditUserUseCase(repository)

  return useCase
}
