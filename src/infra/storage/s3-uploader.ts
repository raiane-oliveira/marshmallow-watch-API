import { randomUUID } from "node:crypto"
import type { UploadParams, Uploader } from "@/domain/app/storage/uploader"
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { env } from "../env"

export class S3Uploader implements Uploader {
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      endpoint: env.AWS_ENDPOINT_API_URL,
      region: "auto",
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async upload(params: UploadParams): Promise<{ uploadId: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${params.fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: uniqueFileName,
        ContentType: params.fileType,
        Body: params.body,
      })
    )

    return {
      uploadId: uniqueFileName,
    }
  }

  async delete(avatarUrlId: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: avatarUrlId,
      })
    )
  }
}
