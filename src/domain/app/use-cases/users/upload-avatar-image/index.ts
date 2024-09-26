import { type Either, left, right } from "@/core/errors/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { User } from "../../../entities/user"
import { InvalidAttachmentType } from "../../../errors/invalid-attachment-type-error"
import type { UsersRepository } from "../../../repositories/users-repository"
import type { Uploader } from "../../../storage/uploader"

interface UploadAvatarImageRequest {
  fileName: string
  fileType: string
  body: Buffer
  userId: string
}

type UploadAvatarImageResponse = Either<
  ResourceNotFoundError | InvalidAttachmentType,
  {
    user: User
  }
>

export class UploadAvatarImageUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private uploader: Uploader
  ) {}

  async execute({
    fileName,
    fileType,
    body,
    userId,
  }: UploadAvatarImageRequest): Promise<UploadAvatarImageResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const validFileTypeRegex = new RegExp(/^(image\/(jpeg|png|jpg))/)

    if (!validFileTypeRegex.test(fileType)) {
      return left(new InvalidAttachmentType(fileType))
    }

    if (user.avatarUrl) {
      this.uploader.delete(user.avatarUrl)
    }

    const { uploadId } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    user.avatarUrl = uploadId

    await this.usersRepository.update(user)

    return right({
      user,
    })
  }
}
