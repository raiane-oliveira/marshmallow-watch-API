import type { FastifyInstance } from "fastify"
import { addMediasToPlaylistController } from "./add-medias-to-playlist"
import { createPlaylistController } from "./create-playlist"

export async function playlistsRoutes(app: FastifyInstance) {
  app.post("/playlists", createPlaylistController)
  app.post("/playlists/:playlistId/add-medias", addMediasToPlaylistController)
}
