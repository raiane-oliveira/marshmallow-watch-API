import { FastifyInstance } from "fastify"
import { registerUserController } from "./register-user"
import { uploadAvatarImageController } from "./upload-avatar-image"

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/register", registerUserController)
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)
}
