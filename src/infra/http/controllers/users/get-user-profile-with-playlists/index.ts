import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeGetUserProfileWithPlaylistsUseCase } from "@/infra/factories/make-get-user-profile-with-playlists-use-case"
import { UserProfileWithPlaylistsPresenter } from "@/infra/http/presenters/user-profile-with-playlists-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"

// [GET] /users/current?lang=
export async function getUserProfileWithPlaylistsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const dict = getLanguage(lang).shared

  const { username } = req.user

  const useCase = makeGetUserProfileWithPlaylistsUseCase()
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
    user: UserProfileWithPlaylistsPresenter.toHTTP(result.value.user),
  })
}
