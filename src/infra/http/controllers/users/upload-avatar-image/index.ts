import { BadRequestError } from "@/core/errors/bad-request-error"
import { InvalidAttachmentType } from "@/domain/app/errors/invalid-attachment-type-error"
import { makeUploadAvatarImageUseCase } from "@/infra/factories/make-upload-avatar-image-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function uploadAvatarImageController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const fileData = await req.file()
  if (!fileData) {
    return reply.status(400).send({
      message: "Must send a file",
    })
  }

  const fileBuffer = await fileData.toBuffer()
  const uploadAvatarImageUseCase = makeUploadAvatarImageUseCase()

  const uploadAvatarImageQuerySchema = z.object({
    userId: z.string({ required_error: "User id must be defined." }),
  })

  const { userId } = uploadAvatarImageQuerySchema.parse(req.query)

  const result = await uploadAvatarImageUseCase.execute({
    userId,
    fileName: fileData.filename,
    fileType: fileData.type,
    body: fileBuffer,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case InvalidAttachmentType: {
        return reply.status(400).send({
          message: error.message,
        })
      }
      default: {
        return reply.status(400).send({
          message: new BadRequestError().message,
        })
      }
    }
  }

  return reply.status(201).send({})
}
