import { BadRequestError } from "@/core/errors/bad-request-error"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import { makeValidateVerificationTokenUseCase } from "@/infra/factories/make-validate-verification-token-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [POST] /auth/:userId/verify-token
export async function validateVerificationTokenController(req: FastifyRequest, reply: FastifyReply) {
  const validateVerificationTokenBodySchema = z.object({
    token: z.string(),
  })

  const validateVerificationTokenRouteSchema = z.object({
    userId: z.string(),
  })

  const { userId } = validateVerificationTokenRouteSchema.parse(req.params)
  const { token } = validateVerificationTokenBodySchema.parse(req.body)

  const useCase = makeValidateVerificationTokenUseCase()

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
