import { BadRequestError } from "@/core/errors/bad-request-error"
import { makeDiscoverTvShowsUseCase } from "@/infra/factories/make-discover-tv-shows-use-case"
import { TvShowPresenter } from "@/infra/http/presenters/tv-show-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /discover/tv-shows
export async function discoverTvShowsControler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const discoverTvShowsQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
    sortBy: z.string().optional(),
    lang: z.string().optional().default("en"),
    genreIds: z
      .string()
      .regex(/(^\w+$)|(.*,.*)|(.*\-.+)?/g)
      .optional()
      .default("")
      .transform(value => {
        if (!value) return undefined

        return value.split(",")
      }),
  })

  const { page, genreIds, lang } = discoverTvShowsQuerySchema.parse(req.query)

  const useCase = makeDiscoverTvShowsUseCase()
  const result = await useCase.execute({ page, genreIds, lang })

  if (result.isLeft()) {
    return reply.status(400).send({
      message: new BadRequestError().message,
    })
  }

  return reply.status(200).send({
    tvShows: result.value.tvShows.map(TvShowPresenter.toHTTP),
  })
}
