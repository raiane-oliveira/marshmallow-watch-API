import { FastifyInstance } from "fastify"
import { uploadAvatarImageController } from "./upload-avatar-image"
import { verifyAccountController } from "./verify-account"

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)

  app.put("/auth/:userId/verify-account/:token", verifyAccountController)
}
