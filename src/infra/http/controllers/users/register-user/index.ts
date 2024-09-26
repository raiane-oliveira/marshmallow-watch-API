import { BadRequestError } from "@/core/errors/bad-request-error"
import { UserAlreadyExistsError } from "@/domain/app/errors/user-already-exists-error"
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
  const registerUserBodySchema = z.object({
    name: z.string().trim(),
    email: z.string().email("Invalid e-mail").trim(),
    password: z.string().min(6, "Invalid password length"),
  })

  const { name, email, password } = registerUserBodySchema.parse(req.body)

  const createUserUseCase = makeCreateUserUseCase()

  const result = await createUserUseCase.execute({
    name,
    email,
    password,
  })

  if (result.isLeft()) {
    const err = result.value

    switch (err.constructor) {
      case UserAlreadyExistsError: {
        return reply.status(409).send({
          message: err.message,
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

  return reply.status(201).send()
}
