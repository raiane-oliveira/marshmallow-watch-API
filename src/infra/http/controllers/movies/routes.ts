import { FastifyInstance } from "fastify"
import { discoverMoviesController } from "./discover-movies"
import publicRoute from "../../middlewares/public-route"

export async function movieRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/movies/discover", discoverMoviesController)
}
