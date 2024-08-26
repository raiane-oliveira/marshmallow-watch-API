import { BadRequestError } from "@/core/errors/bad-request-error"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import { makeAuthenticateUserUseCase } from "@/infra/factories/make-authenticate-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticateUserController(req: FastifyRequest, reply: FastifyReply) {
  const authenticateUserBodySchema = z.object({
    email: z.string().email("Invalid e-mail."),
    password: z.string().min(6, "Invalid password length."),
  })

  const { email, password } = authenticateUserBodySchema.parse(req.body)

  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  const result = await authenticateUserUseCase.execute({
    email,
    password,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case InvalidCredentialsError: {
        return reply.status(401).send({
          message: error.message,
        })
      }
      default: {
        return new BadRequestError().message
      }
    }
  }

  const { user } = result.value

  const token = await reply.jwtSign({}, {
    sign: {
      sub: user.id.toString(),
    },
  })

  const refreshToken = await reply.jwtSign({}, {
    sign: {
      sub: user.id.toString(),
      expiresIn: "7d",
    },
  })

  return reply.setCookie("refresh_token", refreshToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true,
  }).status(200).send({
    token,
  })
}
