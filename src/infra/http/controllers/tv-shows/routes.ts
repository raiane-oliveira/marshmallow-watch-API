import type { FastifyInstance } from "fastify"
import { discoverTvShowsControler } from "./discover-tv-shows"

export async function tvShowRoutes(app: FastifyInstance) {
  app.get("/discover/tv-shows", discoverTvShowsControler)
}
