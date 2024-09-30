import type { FastifyInstance } from "fastify"
import publicRoute from "../../middlewares/public-route"
import { discoverTvShowsControler } from "./discover-tv-shows"

export async function tvShowPublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/discover/tv-shows", discoverTvShowsControler)
}
