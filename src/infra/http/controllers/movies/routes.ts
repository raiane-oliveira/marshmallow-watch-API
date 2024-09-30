import type { FastifyInstance } from "fastify"
import publicRoute from "../../middlewares/public-route"
import { discoverMoviesController } from "./discover-movies"

export async function movieRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/discover/movies", discoverMoviesController)
}
