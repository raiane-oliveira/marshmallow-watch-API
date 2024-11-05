import { getLanguage } from "@/i18n/get-language"
import { makeFetchUpcomingMoviesUseCase } from "@/infra/factories/make-fetch-upcoming-movies-use-case"
import { MoviePresenter } from "@/infra/http/presenters/movie-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /upcoming/movies?lang=&page=
export async function fetchUpcomingMovies(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const fetchUpcomingMoviesQuerySchema = z.object({
    lang: z.string().optional().default("en"),
    page: z.coerce.number().optional().default(1),
  })

  const { lang, page } = fetchUpcomingMoviesQuerySchema.parse(req.query)

  const fetchUpcomingMoviesUseCase = makeFetchUpcomingMoviesUseCase()

  const result = await fetchUpcomingMoviesUseCase.execute({
    lang,
    page,
  })

  const dict = getLanguage(lang)
  if (result.isLeft()) {
    return reply.status(400).send({
      message: dict.shared.errors.badRequest,
    })
  }

  return reply.status(200).send({
    movies: result.value.movies.map(MoviePresenter.toHTTP),
  })
}
