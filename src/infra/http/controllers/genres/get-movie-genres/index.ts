import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeGetMovieGenreUseCase } from "@/infra/factories/make-get-movie-genres-use-case"
import { GenrePresenter } from "@/infra/http/presenters/genre-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"

// GET /genres/movie?lang=
export async function getMovieGenresController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const dict = getLanguage(lang)

  const getMovieGenresUseCase = makeGetMovieGenreUseCase()
  const result = await getMovieGenresUseCase.execute({ lang })

  if (result.isLeft()) {
    return reply.status(400).send({
      message: dict.shared.errors.badRequest,
    })
  }

  const { genres } = result.value

  return reply.status(200).send({
    genres: genres.map(GenrePresenter.toHTTP),
  })
}
