import { FastifyInstance } from "fastify"
import { registerUserController } from "./register-user"
import { uploadAvatarImageController } from "./upload-avatar-image"
import { authenticateUserController } from "./authenticate-user"
import { refreshTokenController } from "./refreshToken"

export async function userRoutes(app: FastifyInstance) {
  app.post("/login", authenticateUserController)
  app.post("/users/register", registerUserController)
  app.post("/users/:userId/upload-avatar-image", uploadAvatarImageController)

  app.patch("/token/refresh", refreshTokenController)
}
