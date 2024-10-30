import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeAddMediasToPlaylistsUseCase } from "@/infra/factories/make-add-medias-to-playlist-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [POST] /playlists/:playlistId/add-medias
export async function addMediasToPlaylistController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const dict = getLanguage(lang).shared

  const addMoviesToPlaylistBodySchema = z.object({
    tmdbMediasId: z
      .array(z.coerce.string({ required_error: dict.inputs.required }))
      .min(1, dict.inputs.required),
  })
  const addMoviesToPlaylistParamsSchema = z.object({
    playlistId: z.string({ required_error: dict.inputs.required }),
  })

  const { tmdbMediasId } = addMoviesToPlaylistBodySchema.parse(req.body)
  const { playlistId } = addMoviesToPlaylistParamsSchema.parse(req.params)

  const addMoviesToPlaylist = makeAddMediasToPlaylistsUseCase()

  const result = await addMoviesToPlaylist.execute({
    playlistId,
    mediasId: tmdbMediasId,
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
      case NotAllowedError: {
        return reply.status(401).send({
          message: dict.errors.notAllowed,
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
