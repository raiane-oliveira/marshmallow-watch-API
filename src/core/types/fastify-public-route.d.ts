import "fastify-plugin"

declare module "fastify" {
  interface FastifyRequest {
    isPublic: boolean
  }
}
