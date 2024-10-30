import type { FastifyInstance } from "fastify"
import { addMediasToPlaylistController } from "./add-medias-to-playlist"

export async function playlistsRoutes(app: FastifyInstance) {
  app.post("/playlists/:playlistId/add-medias", addMediasToPlaylistController)
}
