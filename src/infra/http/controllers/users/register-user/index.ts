import { BadRequestError } from "@/core/errors/bad-request-error"
import { UserAlreadyExistsError } from "@/domain/app/errors/user-already-exists-error"
import { makeCreateUserUseCase } from "@/infra/factories/make-create-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function registerUserController(req: FastifyRequest, reply: FastifyReply) {
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

  return reply.status(201).send()
}
