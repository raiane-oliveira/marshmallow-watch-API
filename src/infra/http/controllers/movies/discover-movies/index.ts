import { BadRequestError } from "@/core/errors/bad-request-error"
import { makeDiscoverMoviesUseCase } from "@/infra/factories/make-discover-movies-use-case"
import { MoviePresenter } from "@/infra/http/presenters/movie-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /discover/movies?page=1
export async function discoverMoviesController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const discoverMoviesQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
    sortBy: z.string().optional(),
    lang: z.string().optional().default("en"),
    release_date_gte: z.string().optional(),
    release_date_lte: z.string().optional(),
    genreIds: z
      .string()
      .regex(/(^\w+$)|(.*,.*)|(.*\-.+)?/g)
      .optional()
      .default(" ")
      .transform(value => {
        if (!value) return undefined

        return value.split(",")
      }),
  })

  const {
    page,
    lang,
    sortBy,
    release_date_gte: releaseDateGte,
    release_date_lte: releaseDateLte,
    genreIds,
  } = discoverMoviesQuerySchema.parse(req.query)

  const discoverMoviesUseCase = makeDiscoverMoviesUseCase()

  const result = await discoverMoviesUseCase.execute({
    page,
    sortBy,
    lang,
    releaseDateLte,
    releaseDateGte,
    genreIds,
  })

  if (result.isLeft()) {
    return reply.status(400).send({
      message: new BadRequestError().message,
    })
  }

  return reply.status(200).send({
    movies: result.value.movies.map(MoviePresenter.toHTTP),
  })
}
