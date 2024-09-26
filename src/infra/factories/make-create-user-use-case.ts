import { CreateUserUseCase } from "@/domain/app/use-cases/users/create-user"
import { BcryptHasher } from "../cryptography/bcrypt-hasher"
import { DbUsersRepository } from "../database/repositories/db-users-repository"

export function makeCreateUserUseCase() {
  const repository = new DbUsersRepository()
  const hasher = new BcryptHasher()
  const useCase = new CreateUserUseCase(repository, hasher)

  return useCase
}
