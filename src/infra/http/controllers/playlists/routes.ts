import type { FastifyInstance } from "fastify"
import { addMoviesToPlaylistController } from "./add-movies-to-playlist"

export async function playlistsRoutes(app: FastifyInstance) {
  app.post("/playlists/:playlistId/add-medias", addMoviesToPlaylistController)
}
