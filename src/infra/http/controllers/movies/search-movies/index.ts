import { BadRequestError } from "@/core/errors/bad-request-error"
import { makeSearchMoviesUseCase } from "@/infra/factories/make-search-movies-use-case"
import { MoviePresenter } from "@/infra/http/presenters/movie-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /search/movies?query=movie&page=1&year=2024
export async function searchMoviesController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const searchMoviesQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().optional().default(1),
    year: z.coerce.number().optional(),
    language: z.string().optional(),
  })

  const { query, page, year, language } = searchMoviesQuerySchema.parse(
    req.query
  )

  const searchMoviesUseCase = makeSearchMoviesUseCase()

  const result = await searchMoviesUseCase.execute({
    query,
    year,
    language,
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
