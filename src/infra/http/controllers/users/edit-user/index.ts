import { BadRequestError } from "@/core/errors/bad-request-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { makeEditUserUseCase } from "@/infra/factories/make-edit-user-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [PUT] /users/:userId
export async function editUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const editUserBodySchema = z.object({
    name: z.string().trim(),
  })

  const editUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = editUserParamsSchema.parse(req.params)
  const { name } = editUserBodySchema.parse(req.body)

  const editUserUseCase = makeEditUserUseCase()

  const result = await editUserUseCase.execute({
    userId,
    name,
  })

  if (result.isLeft()) {
    const err = result.value

    switch (err.constructor) {
      case ResourceNotFoundError: {
        return reply.status(404).send({
          message: err.message,
        })
      }
      default: {
        return reply.status(400).send({
          message: new BadRequestError().message,
        })
      }
    }
  }

  return reply.status(204).send()
}
