import { BadRequestError } from "@/core/errors/bad-request-error"
import { makeFetchUsersUseCase } from "@/infra/factories/make-fetch-users-use-case"
import { UserProfilePresenter } from "@/infra/http/presenters/user-profile-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /users?page=1
export async function fetchUsersController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const fetchUsersQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
  })

  const { page } = fetchUsersQuerySchema.parse(req.query)

  const useCase = makeFetchUsersUseCase()
  const result = await useCase.execute({ page })

  if (result.isLeft()) {
    return reply.status(400).send({
      message: new BadRequestError().message,
    })
  }

  return reply.status(200).send({
    users: result.value.users.map(UserProfilePresenter.toHTTP),
  })
}
