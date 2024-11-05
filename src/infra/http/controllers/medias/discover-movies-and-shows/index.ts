import { Movie } from "@/domain/app/entities/movie"
import { TvShow } from "@/domain/app/entities/tv-show"
import { getLanguage } from "@/i18n/get-language"
import { makeDiscoverMoviesAndShowsUseCase } from "@/infra/factories/make-discover-movies-and-shows-use-case"
import { MoviePresenter } from "@/infra/http/presenters/movie-presenter"
import { TvShowPresenter } from "@/infra/http/presenters/tv-show-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /discover/movies-and-shows?lang=&sortBy=
export async function discoverMoviesAndShowsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const discoverMoviesAndShowsQuerySchema = z.object({
    lang: z.string().optional().default("en"),
    time_window: z.string().optional().default("week"),
  })

  const { lang, time_window: timeWindow } =
    discoverMoviesAndShowsQuerySchema.parse(req.query)

  const dict = getLanguage(lang)

  const discoverMoviesAndShowsUseCase = makeDiscoverMoviesAndShowsUseCase()

  const result = await discoverMoviesAndShowsUseCase.execute({
    lang,
    timeWindow,
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
