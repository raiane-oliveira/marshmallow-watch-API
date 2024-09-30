import { BadRequestError } from "@/core/errors/bad-request-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { makeGetUserProfileUseCase } from "@/infra/factories/make-get-user-profile-use-case"
import { UserProfilePresenter } from "@/infra/http/presenters/user-profile-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /users/:username
export async function getUserProfileController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfileParamsSchema = z.object({
    username: z.string(),
  })

  const { username } = getUserProfileParamsSchema.parse(req.params)

  const useCase = makeGetUserProfileUseCase()
  const result = await useCase.execute({ username })

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

  return reply.status(200).send({
    user: UserProfilePresenter.toHTTP(result.value.user),
  })
}
