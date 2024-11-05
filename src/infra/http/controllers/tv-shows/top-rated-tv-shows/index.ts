import { getLanguage } from "@/i18n/get-language"
import { makeTopRatedTvShowsUseCase } from "@/infra/factories/make-top-rated-tv-shows-use-case"
import { TvShowPresenter } from "@/infra/http/presenters/tv-show-presenter"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

// [GET] /top-rated/tv-shows?page=&lang=
export async function topRatedTvShowsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const topRatedTvShowsQuerySchema = z.object({
    page: z.coerce.number().optional().default(1),
    lang: z.string().optional().default("en"),
  })

  const { page, lang } = topRatedTvShowsQuerySchema.parse(req.query)

  const topRatedTvShowsUseCase = makeTopRatedTvShowsUseCase()

  const result = await topRatedTvShowsUseCase.execute({
    page,
    lang,
  })

  const dict = getLanguage(lang)
  if (result.isLeft()) {
    return reply.status(400).send({
      message: dict.shared.errors.badRequest,
    })
  }

  const tvShows = result.value.tvShows.map(TvShowPresenter.toHTTP)

  return reply.status(200).send({
    tvShows,
  })
}
