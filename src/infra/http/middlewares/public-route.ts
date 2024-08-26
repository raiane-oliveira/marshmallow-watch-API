import fp from "fastify-plugin"

export default fp(function (app, _opts, done) {
  app.decorateRequest("isPublic", true)
  app.addHook("onRequest", async (req) => {
    req.isPublic = true
  })

  done()
})
