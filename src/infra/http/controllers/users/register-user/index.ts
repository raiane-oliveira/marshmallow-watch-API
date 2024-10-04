import { BadRequestError } from "@/core/errors/bad-request-error"
import { InvalidUsernameError } from "@/core/errors/invalid-username-error"
import { UserAlreadyExistsError } from "@/domain/app/errors/user-already-exists-error"
import { localeQuerySchema } from "@/i18n"
import { getLanguage } from "@/i18n/get-language"
import { env } from "@/infra/env"
import { makeCreateUserUseCase } from "@/infra/factories/make-create-user-use-case"
import { MailProvider } from "@/infra/mail/mail-provider"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const mailer = new MailProvider()

export async function registerUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { lang } = localeQuerySchema.parse(req.query)
  const _dict = getLanguage(lang)
  const sharedDictErrors = _dict.shared.errors
  const dict = _dict.requests.registerUser

  const registerUserBodySchema = z.object({
    name: z.string({ required_error: dict.inputs.name.errors.required }).trim(),
    username: z
      .string({ required_error: dict.inputs.username.errors.required })
      .min(3, dict.inputs.username.errors.invalid)
      .trim(),
    email: z
      .string({ required_error: dict.inputs.email.errors.required })
      .email(dict.inputs.email.errors.invalid)
      .trim(),
    password: z
      .string({ required_error: dict.inputs.password.errors.required })
      .min(6, dict.inputs.password.errors.invalid),
  })

  const { name, email, password, username } = registerUserBodySchema.parse(
    req.body
  )

  const createUserUseCase = makeCreateUserUseCase()

  const result = await createUserUseCase.execute({
    name,
    username,
    email,
    password,
  })

  if (result.isLeft()) {
    const err = result.value

    switch (err.constructor) {
      case UserAlreadyExistsError: {
        return reply.status(409).send({
          message: dict.response.errors.userAlreadyExists,
        })
      }
      case InvalidUsernameError: {
        return reply.status(400).send({
          message: sharedDictErrors.invalidUsername,
        })
      }
      default: {
        return reply.status(400).send({
          message: new BadRequestError().message,
        })
      }
    }
  }

  const { user } = result.value

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id.toString(),
      },
    }
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id.toString(),
        expiresIn: "7d",
      },
    }
  )

  mailer.send({
    to: {
      name: user.name,
      email: user.email,
    },
    subject: "Verify your account on Marshmallow Watch!",
    body: `Hello, ${user.name}`,
    html: `<h1>Hello, ${user.name}</h1>
          <p>Click in the button bellow to verify your account.</p>
          <a href="${env.WEBSITE_URL}/verify-account?token=${user.verificationToken}">Verify account</a>
          `,
  })

  return reply
    .setCookie("refresh_token", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(201)
    .send({
      token: accessToken,
    })
}
