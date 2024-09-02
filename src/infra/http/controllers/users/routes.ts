import { FastifyInstance } from "fastify"
import { uploadAvatarImageController } from "./upload-avatar-image"
import { verifyAccountController } from "./verify-account"
import { editUserController } from "./edit-user"

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)
  app.put("/users/:userId", editUserController)

  app.put("/auth/:userId/verify-account/:token", verifyAccountController)
}
