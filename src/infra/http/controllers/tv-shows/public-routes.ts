import type { FastifyInstance } from "fastify"
import publicRoute from "../../middlewares/public-route"
import { discoverTvShowsControler } from "./discover-tv-shows"
import { searchTvShowsController } from "./search-tv-shows"
import { topRatedTvShowsController } from "./top-rated-tv-shows"

export async function tvShowPublicRoutes(app: FastifyInstance) {
  app.register(publicRoute)

  app.get("/top-rated/tv-shows", topRatedTvShowsController)
  app.get("/discover/tv-shows", discoverTvShowsControler)
  app.get("/search/tv-shows", searchTvShowsController)
}
