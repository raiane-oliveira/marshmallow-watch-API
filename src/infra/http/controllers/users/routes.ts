import type { FastifyInstance } from "fastify"
import { editUserController } from "./edit-user"
import { uploadAvatarImageController } from "./upload-avatar-image"
import { verifyAccountController } from "./verify-account"
import { getUserProfileWithPlaylistsController } from "./get-user-profile-with-playlists"

export async function userRoutes(app: FastifyInstance) {
  app.get("/users/current", getUserProfileWithPlaylistsController)
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)
  app.put("/users/:userId", editUserController)

  app.put("/auth/:userId/verify-account/:token", verifyAccountController)
}
