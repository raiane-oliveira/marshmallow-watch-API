import { Movie } from "@/domain/app/entities/movie"
import { TvShow } from "@/domain/app/entities/tv-show"
import { getLanguage } from "@/i18n/get-language"
import { makeDiscoverMoviesAndShowsUseCase } from "@/infra/factories/make-discover-movies-and-shows-use-case"
import { MoviePresenter } from "@/infra/http/presenters/movie-presenter"
import { TvShowPresenter } from "@/infra/http/presenters/tv-show-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /discover/movies-and-shows?lang=&sortBy=&page=
export async function discoverMoviesAndShowsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const discoverMoviesAndShowsQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
    sortBy: z.string().optional(),
    lang: z.string().optional().default("en"),
  })

  const { page, lang, sortBy } = discoverMoviesAndShowsQuerySchema.parse(
    req.query
  )

  const dict = getLanguage(lang)

  const discoverMoviesUseCase = makeDiscoverMoviesAndShowsUseCase()

  const result = await discoverMoviesUseCase.execute({
    page,
    lang,
    sortBy,
  })

  if (result.isLeft()) {
    return reply.status(400).send({
      message: dict.shared.errors.badRequest,
    })
  }

  const medias = result.value.medias.map(media => {
    if (media instanceof Movie) {
      return MoviePresenter.toHTTP(media)
    }

    return media instanceof TvShow ? TvShowPresenter.toHTTP(media) : media
  })

  return reply.status(200).send({
    medias,
  })
}
