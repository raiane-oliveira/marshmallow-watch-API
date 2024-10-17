import { BadRequestError } from "@/core/errors/bad-request-error"
import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { makeAuthenticateUserUseCase } from "@/infra/factories/make-authenticate-user-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticateUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const dict = getLanguage(lang).requests.authenticateUser

  const authenticateUserBodySchema = z.object({
    email: z
      .string({ required_error: dict.inputs.email.errors.required })
      .email(dict.inputs.email.errors.invalid),
    password: z
      .string({ required_error: dict.inputs.password.errors.required })
      .min(6, dict.inputs.password.errors.invalid),
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
          message: dict.response.errors.invalidCredentials,
        })
      }
      default: {
        return new BadRequestError().message
      }
    }
  }

  const { user } = result.value

  const token = await reply.jwtSign(
    {
      username: user.username.toString(),
    },
    {
      sign: {
        sub: user.id.toString(),
      },
    }
  )

  const refreshToken = await reply.jwtSign(
    {
      username: user.username.toString(),
    },
    {
      sign: {
        sub: user.id.toString(),
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
