import type { FastifyReply, FastifyRequest } from "fastify"

export async function refreshTokenController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {
      username: req.user.username,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    }
  )

  const refreshToken = await reply.jwtSign(
    {
      username: req.user.username,
    },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "7d",
      },
    }
  )

  return reply
    .setCookie("refresh_token", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
