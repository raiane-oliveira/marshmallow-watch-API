import { BadRequestError } from "@/core/errors/bad-request-error"
import { makeDiscoverMoviesUseCase } from "@/infra/factories/make-discover-movies-use-case"
import { MoviePresenter } from "@/infra/http/presenters/movie-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /movies/discover?page=1&orderBy=popularity.desc
export async function discoverMoviesController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const discoverMoviesQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
    orderBy: z.string().optional(),
  })

  const { page } = discoverMoviesQuerySchema.parse(req.query)

  const discoverMoviesUseCase = makeDiscoverMoviesUseCase()

  const result = await discoverMoviesUseCase.execute({
    page,
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
