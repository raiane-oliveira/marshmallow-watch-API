import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeCreatePlaylistUseCase } from "@/infra/factories/make-create-playlist-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [POST] /playlists
export async function createPlaylistController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const dict = getLanguage(lang).shared

  const createPlaylistBodySchema = z.object({
    name: z.string({ required_error: dict.inputs.required }),
    color: z.string({ required_error: dict.inputs.required }),
    visibility: z.enum(["public", "private"]).optional().default("public"),
  })

  const { name, visibility, color } = createPlaylistBodySchema.parse(req.body)

  const createPlaylist = makeCreatePlaylistUseCase()

  const result = await createPlaylist.execute({
    name,
    visibility,
    color,
    userId: req.user.sub,
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
        return reply.status(400).send({
          message: dict.errors.badRequest,
        })
      }
    }
  }

  return reply.status(201).send({})
}
