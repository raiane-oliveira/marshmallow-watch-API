import { BadRequestError } from "@/core/errors/bad-request-error"
import { makeSearchTvShowsUseCase } from "@/infra/factories/make-search-tv-shows-use-case"
import { TvShowPresenter } from "@/infra/http/presenters/tv-show-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /search/tv-shows?query=tv-show&page=1&year=2024
export async function searchTvShowsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const searchTvShowsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().optional().default(1),
    firstAirDateYear: z.coerce.number().optional(),
    language: z.string().optional(),
  })

  const { query, page, firstAirDateYear, language } =
    searchTvShowsQuerySchema.parse(req.query)

  const searchTvShowsUseCase = makeSearchTvShowsUseCase()

  const result = await searchTvShowsUseCase.execute({
    query,
    firstAirDateYear,
    language,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send({
      message: new BadRequestError().message,
    })
  }

  return reply.status(200).send({
    tvShows: result.value.tvShows.map(TvShowPresenter.toHTTP),
  })
}
