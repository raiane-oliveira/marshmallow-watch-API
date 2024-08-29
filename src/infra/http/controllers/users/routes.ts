import { FastifyInstance } from "fastify"
import { uploadAvatarImageController } from "./upload-avatar-image"
import { validateVerificationTokenController } from "./validate-verification-token"

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)

  app.post("/auth/:userId/verify-token", validateVerificationTokenController)
}
