import fastify from "fastify"
import multipart from "@fastify/multipart"
import { ZodError } from "zod"
import { env } from "./env"
import { userRoutes } from "./http/controllers/users/routes"

export const app = fastify()

app.register(multipart)

app.register(userRoutes)

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: err.flatten().fieldErrors,
    })
  }

  if (env.NODE_ENV !== "prod") {
    console.error(err)
  }
  else {
    // TODO: log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: "Internal server error",
  })
})
