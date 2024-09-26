import { AuthenticateUserUseCase } from "@/domain/app/use-cases/users/authenticate-user"
import { DbUsersRepository } from "../database/repositories/db-users-repository"
import { BcryptHasher } from "../cryptography/bcrypt-hasher"

export function makeAuthenticateUserUseCase() {
  const usersRepository = new DbUsersRepository()
  const hasher = new BcryptHasher()
  const useCase = new AuthenticateUserUseCase(usersRepository, hasher)

  return useCase
}
