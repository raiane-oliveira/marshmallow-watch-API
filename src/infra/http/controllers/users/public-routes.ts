import type { FastifyInstance } from "fastify"
import publicRoutePlugin from "../../middlewares/public-route"
import { authenticateUserController } from "./authenticate-user"
import { fetchUsersController } from "./fetch-users"
import { getPublicUserProfileController } from "./get-public-user-profile"
import { registerUserController } from "./register-user"
import { refreshTokenController } from "./refresh-token"

export async function userPublicRoutes(app: FastifyInstance) {
  app.register(publicRoutePlugin)

  app.post("/login", authenticateUserController)
  app.post("/users/register", registerUserController)

  app.patch("/token/refresh", refreshTokenController)

  app.get("/users", fetchUsersController)
  app.get("/users/:username", getPublicUserProfileController)
}
