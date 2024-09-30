import type { FastifyInstance } from "fastify"
import { discoverTvShowsControler } from "./discover-tv-shows"
import publicRoute from "../../middlewares/public-route"

export async function tvShowPublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/discover/tv-shows", discoverTvShowsControler)
}
