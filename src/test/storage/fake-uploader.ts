import { Uploader, UploadParams } from "@/domain/app/storage/uploader"
import { randomUUID } from "crypto"

interface Upload {
  fileName: string
  uploadId: string
}

export class FakeUploader implements Uploader {
  uploads: Upload[] = []

  async upload({ fileName }: UploadParams) {
    const uploadId = fileName.concat(`-uploaded-${randomUUID()}`)

    this.uploads.push({
      fileName,
      uploadId,
    })

    return {
      uploadId,
    }
  }

  async delete(avatarUrlId: string) {
    const avatarIndex = this.uploads.findIndex(item => item.uploadId === avatarUrlId)

    this.uploads.splice(avatarIndex, 1)
  }
}
