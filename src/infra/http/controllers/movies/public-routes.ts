import type { FastifyInstance } from "fastify"
import publicRoute from "../../middlewares/public-route"
import { discoverMoviesController } from "./discover-movies"
import { searchMoviesController } from "./search-movies"
import { fetchUpcomingMovies } from "./fetch-upcoming-movies"

export async function moviePublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/discover/movies", discoverMoviesController)
  app.get("/search/movies", searchMoviesController)
  app.get("/upcoming/movies", fetchUpcomingMovies)
}
