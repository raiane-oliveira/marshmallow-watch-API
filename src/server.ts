import fastify from "fastify"
import { env } from "./core/config/env"

const app = fastify()

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server Running on port: ${env.PORT}`)
})
