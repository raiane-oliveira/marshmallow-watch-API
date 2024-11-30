import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
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

  let isValidToken = false
  try {
    await req.jwtVerify()
    isValidToken = true
  } catch (err) {
    isValidToken = false
  }

  const useCase = makeGetUserPlaylistsUseCase()
  const result = await useCase.execute({
    username,
    page,
    with:
      isValidToken && req.user !== null && req.user.username === username
        ? filter
        : ["public"],
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

  const { playlists, defaultPlaylists } = result.value

  return reply.status(200).send({
    playlists: playlists.map(PlaylistPresenter.toHTTP),
    defaultPlaylists: defaultPlaylists.map(PlaylistPresenter.toHTTP),
  })
}
