import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import multipart from "@fastify/multipart"
import fastify from "fastify"

import { ZodError } from "zod"
import { env } from "./env"
import { moviePublicRoutes } from "./http/controllers/movies/public-routes"
import { tvShowPublicRoutes } from "./http/controllers/tv-shows/public-routes"
import { userPublicRoutes } from "./http/controllers/users/public-routes"
import { userRoutes } from "./http/controllers/users/routes"
import { verifyJWT } from "./http/middlewares/verify-jwt"

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

app.register(fastifyCors, {
  origin: env.WEBSITE_URL,
  credentials: true,
})
app.register(multipart)

app.addHook("preHandler", verifyJWT)

app.register(tvShowPublicRoutes)
app.register(moviePublicRoutes)
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
