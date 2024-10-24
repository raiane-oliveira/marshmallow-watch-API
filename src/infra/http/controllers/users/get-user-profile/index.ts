import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeGetUserProfileUseCase } from "@/infra/factories/make-get-user-profile-use-case"
import { UserProfilePresenter } from "@/infra/http/presenters/user-profile-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"

// [GET] /users/current?lang=
export async function getUserProfileController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const dict = getLanguage(lang).shared

  const { username } = req.user

  const useCase = makeGetUserProfileUseCase()
  const result = await useCase.execute({ username })

  if (result.isLeft()) {
    const err = result.value

    switch (err.constructor) {
      case ResourceNotFoundError: {
        return reply.status(404).send({
          message: dict.errors.resourceNotFound,
        })
      }
      default: {
        return reply.status(400).send({
          message: dict.errors.badRequest,
        })
      }
    }
  }

  return reply.status(200).send({
    user: UserProfilePresenter.toHTTP(result.value.user),
  })
}
