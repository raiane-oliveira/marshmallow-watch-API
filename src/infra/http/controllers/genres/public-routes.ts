import type { FastifyInstance } from "fastify"
import publicRoute from "../../middlewares/public-route"
import { getMovieGenresController } from "./get-movie-genres"
import { getShowGenresController } from "./get-show-genres"

export async function genrePublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/genres/movie", getMovieGenresController)
  app.get("/genres/show", getShowGenresController)
}
