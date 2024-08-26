import { FastifyReply, FastifyRequest } from "fastify"

export async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
  if (req.isPublic) {
    return
  }

  try {
    await req.jwtVerify()
  }
  catch (err) {
    return reply.status(401).send({
      message: "Unauthorized.",
    })
  }
}
