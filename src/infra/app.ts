import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import multipart from "@fastify/multipart"
import fastify from "fastify"

import { ZodError } from "zod"
import { env } from "./env"
import { movieRoutes } from "./http/controllers/movies/routes"
import { userPublicRoutes } from "./http/controllers/users/public-routes"
import { userRoutes } from "./http/controllers/users/routes"
import { verifyJWT } from "./http/middlewares/verify-jwt"
import { tvShowRoutes } from "./http/controllers/tv-shows/routes"

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
  cookie: {
    cookieName: "refresh_token",
    signed: false,
  },
})
app.register(multipart)

app.addHook("preHandler", verifyJWT)

app.register(tvShowRoutes)
app.register(movieRoutes)
app.register(userRoutes)
app.register(userPublicRoutes)

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: err.flatten().fieldErrors,
    })
  }

  if (env.NODE_ENV !== "prod") {
    console.error(err)
  } else {
    // TODO: log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: "Internal server error",
  })
})
