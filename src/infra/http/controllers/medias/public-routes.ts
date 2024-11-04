import type { FastifyInstance } from "fastify"
import { discoverMoviesAndShowsController } from "./discover-movies-and-shows"
import publicRoute from "../../middlewares/public-route"

export async function mediasPublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/discover/movies-and-shows", discoverMoviesAndShowsController)
}
