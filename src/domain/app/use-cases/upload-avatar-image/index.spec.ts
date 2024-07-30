import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { UploadAvatarImage } from "."
import { makeUser } from "@/test/factories/make-user"
import { FakeUploader } from "@/test/storage/fake-uploader"
import { InvalidAttachmentType } from "../../errors/invalid-attachment-type-error"

let fakeUploader: FakeUploader
let usersRepository: InMemoryUsersRepository
let sut: UploadAvatarImage

describe("Upload Avatar Image Use Case", () => {
  beforeEach(() => {
    fakeUploader = new FakeUploader()

    usersRepository = new InMemoryUsersRepository()
    sut = new UploadAvatarImage(usersRepository, fakeUploader)
  })

  it("should be able to upload an avatar image to user", async () => {
    const user = makeUser()
    usersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      fileName: 'js-file',
      fileType: 'image/png',
      body: Buffer.from(user.name),
    })

    expect(result.isRight()).toBe(true)
    expect(fakeUploader.uploads[0].fileName).toEqual('js-file')

    const uploaderId = fakeUploader.uploads[0]

    if (result.isRight()) {
      expect(result.value.user).toEqual(expect.objectContaining({
        avatarUrl: uploaderId.uploadId
      }))
    }
  })

  it("should not be able to upload invalid type image", async () => {
    const user = makeUser()
    usersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      fileName: 'js-file-wrong',
      fileType: 'image/gif',
      body: Buffer.from(user.name),
    })

    expect(result.isLeft()).toBe(true)
    expect(fakeUploader.uploads).toHaveLength(0)

    if (result.isLeft()) {
      expect(result.value.constructor).toBe(InvalidAttachmentType)
    }
  })
})

