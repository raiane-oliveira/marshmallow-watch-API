import { app } from "./app"
import { env } from "./env"

app.listen({ port: env.PORT, host: env.NODE_ENV === 'prod' ? '0.0.0.0' : 'localhost' }).then(() => {
  console.log(`HTTP Server Running on port: ${env.PORT}`)
})
