import { FastifyInstance } from "fastify"
import { registerUserController } from "./register-user"
import { authenticateUserController } from "./authenticate-user"
import { refreshTokenController } from "./refreshToken"
import publicRoutePlugin from "../../middlewares/public-route"

export async function userPublicRoutes(app: FastifyInstance) {
  app.register(publicRoutePlugin)

  app.post("/login", authenticateUserController)
  app.post("/users/register", registerUserController)

  app.patch("/token/refresh", refreshTokenController)
}
