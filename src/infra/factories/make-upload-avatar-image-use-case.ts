import { UploadAvatarImageUseCase } from "@/domain/app/use-cases/users/upload-avatar-image"
import { DbUsersRepository } from "../database/repositories/db-users-repository"
import { S3Uploader } from "../storage/s3-uploader"

export function makeUploadAvatarImageUseCase() {
  const usersRepository = new DbUsersRepository()
  const uploader = new S3Uploader()
  const useCase = new UploadAvatarImageUseCase(usersRepository, uploader)

  return useCase
}
