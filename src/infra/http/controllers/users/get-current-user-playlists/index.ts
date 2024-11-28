import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import type { Visibility } from "@/core/types/utils"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeGetUserPlaylistsUseCase } from "@/infra/factories/make-get-user-playlists-use-case"
import { PlaylistPresenter } from "@/infra/http/presenters/playlist-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// GET /users/:username/playlists?page=&filter=public,private&lang=
export async function getCurrentUserPlaylistsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getCurrentUserPlaylistsQuerySchema = localeQuerySchema.extend({
    filter: z
      .string()
      .regex(/(^\w+$)|(.*,.*)|(.*\-.+)/g)
      .optional()
      .default("all")
      .transform(value => value.split(",")),
    page: z.coerce.number().optional().default(1),
  })

  const { lang, page, filter } = getCurrentUserPlaylistsQuerySchema.parse(
    req.query
  )
  const dict = getLanguage(lang).shared

  const { username } = z
    .object({ username: z.string({ required_error: dict.inputs.required }) })
    .parse(req.params)

  const useCase = makeGetUserPlaylistsUseCase()
  const result = await useCase.execute({
    username,
    page,
    with: "user" in req ? (filter as ("all" | Visibility)[]) : ["public"],
  })

  if (result.isLeft()) {
    const err = result.value

    switch (err.constructor) {
      case ResourceNotFoundError: {
        return reply.status(404).send({
          message: dict.errors.resourceNotFound,
        })
      }
      default: {
        return reply.status(404).send({
          message: dict.errors.badRequest,
        })
      }
    }
  }

  const { playlists } = result.value

  return reply.status(200).send({
    playlists: playlists.map(PlaylistPresenter.toHTTP),
  })
}
