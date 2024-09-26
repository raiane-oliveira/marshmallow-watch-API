import { BadRequestError } from "@/core/errors/bad-request-error"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import { makeVerifyAccountTokenUseCase } from "@/infra/factories/make-verify-account-token-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [PUT] /auth/:userId/verify-account/:token
export async function verifyAccountController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const validateVerificationTokenRouteSchema = z.object({
    userId: z.string(),
    token: z.string(),
  })

  const { userId, token } = validateVerificationTokenRouteSchema.parse(
    req.params
  )

  const useCase = makeVerifyAccountTokenUseCase()

  const result = await useCase.execute({
    userId,
    token,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case InvalidCredentialsError: {
        return reply.status(401).send({
          message: "Unathorized",
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
