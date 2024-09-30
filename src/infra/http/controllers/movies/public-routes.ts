import type { FastifyInstance } from "fastify"
import publicRoute from "../../middlewares/public-route"
import { discoverMoviesController } from "./discover-movies"
import { searchMoviesController } from "./search-movies"

export async function moviePublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/discover/movies", discoverMoviesController)
  app.get("/search/movies", searchMoviesController)
}
