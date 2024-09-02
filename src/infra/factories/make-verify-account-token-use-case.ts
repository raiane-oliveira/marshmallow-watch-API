import { VerifyAccountTokenUseCase } from "@/domain/app/use-cases/verify-account-token"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeVerifyAccountTokenUseCase() {
  const usersRepository = new DbUsersRepository()
  const useCase = new VerifyAccountTokenUseCase(usersRepository)

  return useCase
}
