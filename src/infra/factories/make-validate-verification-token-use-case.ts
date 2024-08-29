import { ValidateVerificationTokenUseCase } from "@/domain/app/use-cases/validate-verification-token"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeValidateVerificationTokenUseCase() {
  const usersRepository = new DbUsersRepository()
  const useCase = new ValidateVerificationTokenUseCase(usersRepository)

  return useCase
}
