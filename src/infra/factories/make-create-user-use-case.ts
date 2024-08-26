import { CreateUserUseCase } from "@/domain/app/use-cases/create-user"
import { DbUsersRepository } from "../database/repositories/db-users-repository"
import { BcryptHasher } from "../cryptography/bcrypt-hasher"

export function makeCreateUserUseCase() {
  const repository = new DbUsersRepository()
  const hasher = new BcryptHasher()
  const useCase = new CreateUserUseCase(repository, hasher)

  return useCase
}
