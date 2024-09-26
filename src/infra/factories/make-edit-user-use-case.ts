import { EditUserUseCase } from "@/domain/app/use-cases/users/edit-user"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeEditUserUseCase() {
  const repository = new DbUsersRepository()
  const useCase = new EditUserUseCase(repository)

  return useCase
}
