import type { FastifyInstance } from "fastify"
import { editUserController } from "./edit-user"
import { getUserProfileController } from "./get-user-profile"
import { uploadAvatarImageController } from "./upload-avatar-image"
import { verifyAccountController } from "./verify-account"

export async function userRoutes(app: FastifyInstance) {
  app.get("/users/current", getUserProfileController)
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)
  app.put("/users/:userId", editUserController)

  app.put("/auth/:userId/verify-account/:token", verifyAccountController)
}
