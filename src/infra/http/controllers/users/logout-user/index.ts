import type { FastifyReply, FastifyRequest } from "fastify"

// [DELETE] /logout
export async function logoutUserController(
  _req: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie("refresh_token")

  return reply.status(204).send({})
}
