import { FastifyInstance } from "fastify"
import { uploadAvatarImageController } from "./upload-avatar-image"

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)
}
